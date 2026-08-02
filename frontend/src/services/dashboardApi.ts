import { apiFetch, type GetToken } from './apiClient'

export interface DashboardCount {
  total: number
}

export interface DashboardYearStat extends DashboardCount {
  year: number
}

export interface DashboardNamedStat extends DashboardCount {
  id: number
  name: string
}

export interface DashboardStats {
  byYear: DashboardYearStat[]
  byMajor: DashboardNamedStat[]
  byKnowledgeArea: DashboardNamedStat[]
  byResearchLine: DashboardNamedStat[]
  topTechnologies: DashboardNamedStat[]
}

export const dashboardApi = {
  async getStats(getToken: GetToken): Promise<DashboardStats> {
    return apiFetch<DashboardStats>('/api/dashboard/stats', getToken)
  },
}
