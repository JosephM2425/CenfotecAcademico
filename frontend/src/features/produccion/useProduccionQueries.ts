import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produccionApi } from '../../services/produccionApi'
import { queryKeys } from '../../services/queryKeys'
import type { ProduccionInput } from '../../services/types'

export function useProduccionList() {
  return useQuery({ queryKey: queryKeys.produccion, queryFn: () => produccionApi.list() })
}

export function useProduccionDetail(id: number) {
  return useQuery({
    queryKey: queryKeys.produccionDetail(id),
    queryFn: () => produccionApi.getById(id),
    enabled: Number.isFinite(id),
  })
}

export function useCreateProduccion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ProduccionInput) => produccionApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.produccion }),
  })
}

export function useUpdateProduccion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<ProduccionInput> }) => produccionApi.update(id, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.produccion })
      queryClient.invalidateQueries({ queryKey: queryKeys.produccionDetail(variables.id) })
    },
  })
}

export function useDeleteProduccion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => produccionApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.produccion }),
  })
}
