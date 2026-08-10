import { apiFetch, type GetToken } from './apiClient'

export interface CatalogSyncResult {
  total: number
  created: number
  skipped: number
}

export interface OpenAlexSyncResult {
  knowledgeAreas: CatalogSyncResult
  technologies: CatalogSyncResult
}

export const integrationsApi = {
  async syncOpenAlexCatalogs(getToken: GetToken): Promise<OpenAlexSyncResult> {
    return apiFetch<OpenAlexSyncResult>('/api/integrations/openalex/sync-catalogs', getToken, { method: 'POST' })
  },
}
