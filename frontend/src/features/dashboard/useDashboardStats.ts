import { useAuth } from '@clerk/react'
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../../services/dashboardApi'
import { queryKeys } from '../../services/queryKeys'

export function useDashboardStats(enabled: boolean) {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => dashboardApi.getStats(getToken),
    enabled,
  })
}
