import { useAuth } from '@clerk/react'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../services/apiClient'
import { queryKeys } from '../services/queryKeys'

export interface MeResponse {
  id: number
  name: string
  email: string
  role: number
  status: number
  registeredAt: string
}

export function useMe() {
  const { getToken, isSignedIn } = useAuth()

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => apiFetch<MeResponse>('/api/me', getToken),
    enabled: !!isSignedIn,
    retry: false,
  })
}
