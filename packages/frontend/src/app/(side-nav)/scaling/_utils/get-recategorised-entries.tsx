import partition from 'lodash/partition'
import type { TabbedScalingEntries } from '~/app/(side-nav)/scaling/_utils/group-by-scaling-tabs'
import type { CommonScalingEntry } from '~/server/features/scaling/get-common-scaling-entry'

export function getRecategorisedEntries<T extends CommonScalingEntry>(
  entries: TabbedScalingEntries<T>,
  sortFn: ((a: T, b: T) => number) | undefined,
) {
  const [migratedRollups, rollups] = partition(
    entries.rollups,
    (entry) => entry.statuses?.countdowns?.otherMigration,
  )

  const [migratedValidiumsAndOptimiums, validiumsAndOptimiums] = partition(
    entries.validiumsAndOptimiums,
    (entry) => entry.statuses?.countdowns?.otherMigration,
  )

  const others = [
    ...migratedRollups,
    ...migratedValidiumsAndOptimiums,
    ...entries.others,
  ].sort(sortFn)

  const isUnderReviewTemplate = (e: T) =>
    e.statuses?.reviewStatus === 'initialReview'

  const [rollupsUnderReview, visibleRollups] = partition(rollups, isUnderReviewTemplate)
  const [validiumsUnderReview, visibleValidiums] = partition(
    validiumsAndOptimiums,
    isUnderReviewTemplate,
  )
  const [othersUnderReview, visibleOthers] = partition(others, isUnderReviewTemplate)

  return {
    rollups: visibleRollups,
    validiumsAndOptimiums: visibleValidiums,
    others: visibleOthers,
    underReview: [...rollupsUnderReview, ...validiumsUnderReview, ...othersUnderReview].sort(sortFn),
  }
}
