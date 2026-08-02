import { useAuth } from '@clerk/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../services/queryKeys'
import { usuariosApi } from '../../services/usuariosApi'
import type { UsuarioInput } from '../../services/types'

export function useUsuariosList() {
  const { getToken } = useAuth()
  return useQuery({ queryKey: queryKeys.usuarios, queryFn: () => usuariosApi.list(getToken) })
}

export function useCreateUsuario() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UsuarioInput) => usuariosApi.create(getToken, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.usuarios }),
  })
}

export function useUpdateUsuario() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<UsuarioInput> }) => usuariosApi.update(getToken, id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.usuarios }),
  })
}

export function useDeleteUsuario() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => usuariosApi.remove(getToken, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.usuarios }),
  })
}
