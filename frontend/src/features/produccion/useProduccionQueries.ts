import { useAuth } from '@clerk/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../services/queryKeys'
import { produccionApi, type ProduccionCatalogs } from '../../services/produccionApi'
import type { ProduccionInput } from '../../services/types'
import { useCatalogList } from '../catalogos/useCatalogQueries'

function useProduccionCatalogs(): { catalogs: ProduccionCatalogs; isReady: boolean } {
  const tipos = useCatalogList('tipos')
  const categorias = useCatalogList('categorias')
  const areas = useCatalogList('areas')
  const tiposInvestigacion = useCatalogList('tipos-investigacion')
  const carreras = useCatalogList('carreras')
  const lineas = useCatalogList('lineas')
  const tecnologias = useCatalogList('tecnologias')

  const isReady = [tipos, categorias, areas, tiposInvestigacion, carreras, lineas, tecnologias].every(
    (query) => query.data !== undefined,
  )

  return {
    isReady,
    catalogs: {
      tipos: tipos.data ?? [],
      categorias: categorias.data ?? [],
      areas: areas.data ?? [],
      tiposInvestigacion: tiposInvestigacion.data ?? [],
      carreras: carreras.data ?? [],
      lineas: lineas.data ?? [],
      tecnologias: tecnologias.data ?? [],
    },
  }
}

export function useProduccionList() {
  const { getToken } = useAuth()
  const { catalogs, isReady } = useProduccionCatalogs()
  return useQuery({
    queryKey: queryKeys.produccion,
    queryFn: () => produccionApi.list(getToken, catalogs),
    enabled: isReady,
  })
}

export function useProduccionDetail(id: number) {
  const { getToken } = useAuth()
  const { catalogs, isReady } = useProduccionCatalogs()
  return useQuery({
    queryKey: queryKeys.produccionDetail(id),
    queryFn: () => produccionApi.getById(getToken, id, catalogs),
    enabled: isReady && Number.isFinite(id),
  })
}

export function useCreateProduccion() {
  const { getToken } = useAuth()
  const { catalogs } = useProduccionCatalogs()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ProduccionInput) => produccionApi.create(getToken, input, catalogs),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.produccion }),
  })
}

export function useUpdateProduccion() {
  const { getToken } = useAuth()
  const { catalogs } = useProduccionCatalogs()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProduccionInput }) =>
      produccionApi.update(getToken, id, input, catalogs),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.produccion })
      queryClient.invalidateQueries({ queryKey: queryKeys.produccionDetail(variables.id) })
    },
  })
}

export function useDeleteProduccion() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => produccionApi.remove(getToken, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.produccion }),
  })
}

export function useUploadDocumento() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => produccionApi.uploadDocumento(getToken, id, file),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.produccionDetail(variables.id) })
    },
  })
}
