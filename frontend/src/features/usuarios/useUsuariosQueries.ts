import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../services/queryKeys'
import { usuariosApi } from '../../services/usuariosApi'
import type { UsuarioInput } from '../../services/types'

export function useUsuariosList() {
  return useQuery({ queryKey: queryKeys.usuarios, queryFn: () => usuariosApi.list() })
}

export function useCreateUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UsuarioInput) => usuariosApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.usuarios }),
  })
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<UsuarioInput> }) => usuariosApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.usuarios }),
  })
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => usuariosApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.usuarios }),
  })
}
