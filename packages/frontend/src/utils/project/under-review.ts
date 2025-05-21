import { assertUnreachable } from '@l2beat/shared-pure'

interface Params {
  reviewStatus: 'initialReview' | 'inReview' | 'reviewed' | undefined
  impactfulChange: boolean
}

export type UnderReviewStatus = 'config' | 'impactful-change' | undefined

export function getUnderReviewStatus({
  reviewStatus,
  impactfulChange,
}: Params): UnderReviewStatus {
  if (reviewStatus === 'initialReview' || reviewStatus === 'inReview') {
    return 'config'
  }

  if (impactfulChange) {
    return 'impactful-change'
  }
}
export function getUnderReviewText(status: NonNullable<UnderReviewStatus>) {
  switch (status) {
    case 'config':
      return 'This project is under review.'
    case 'impactful-change':
      return 'There are impactful changes and part of the information might be outdated.'
    default:
      assertUnreachable(status)
  }
}
