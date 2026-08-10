import { useAuth } from '@clerk/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { integrationsApi, type OpenAlexSyncResult } from '../../services/integrationsApi'
import { queryKeys } from '../../services/queryKeys'

export function useSyncOpenAlex() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<OpenAlexSyncResult>({
    mutationFn: () => integrationsApi.syncOpenAlexCatalogs(getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.catalog('areas') })
      queryClient.invalidateQueries({ queryKey: queryKeys.catalog('tecnologias') })
    },
  })
}
