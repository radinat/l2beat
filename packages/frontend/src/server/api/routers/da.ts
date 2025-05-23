import {
  DaThroughputChartParams,
  getDaThroughputChart,
} from '~/server/features/data-availability/throughput/get-da-throughput-chart'
import {
  DaThroughputChartByProjectParams,
  getDaThroughputChartByProject,
} from '~/server/features/data-availability/throughput/get-da-throughput-chart-by-project'
import {
  ProjectDaThroughputChartParams,
  getProjectDaThroughputChart,
} from '~/server/features/data-availability/throughput/get-project-da-throughput-chart'
import { procedure, router } from '../trpc'

export const daRouter = router({
  chart: procedure
    .input(DaThroughputChartParams)
    .query(async ({ input }) => getDaThroughputChart(input)),
  projectChart: procedure
    .input(ProjectDaThroughputChartParams)
    .query(async ({ input }) => getProjectDaThroughputChart(input)),
  projectChartByProject: procedure
    .input(DaThroughputChartByProjectParams)
    .query(async ({ input }) => getDaThroughputChartByProject(input)),
})
