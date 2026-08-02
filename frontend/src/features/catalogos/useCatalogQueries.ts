import { useAuth } from '@clerk/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../services/queryKeys'
import type { CatalogItem } from '../../services/types'
import { getCatalogConfig } from './catalogConfig'

export function useCatalogList(key: string) {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: queryKeys.catalog(key),
    queryFn: () => getCatalogConfig(key).api.list(getToken),
  })
}

export function useCreateCatalogItem(key: string) {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: Omit<CatalogItem, 'id'>) => getCatalogConfig(key).api.create(getToken, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.catalog(key) }),
  })
}

export function useUpdateCatalogItem(key: string) {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<Omit<CatalogItem, 'id'>> }) =>
      getCatalogConfig(key).api.update(getToken, id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.catalog(key) }),
  })
}

export function useDeleteCatalogItem(key: string) {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => getCatalogConfig(key).api.remove(getToken, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.catalog(key) }),
  })
}
