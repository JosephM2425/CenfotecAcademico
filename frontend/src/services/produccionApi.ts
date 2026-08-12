import { apiDownload, apiFetch, apiUpload, type GetToken } from './apiClient'
import { CODE_BY_PRODUCTION_STATUS, PRODUCTION_STATUS_BY_CODE } from './productionCodes'
import type { CatalogItem, EstadoProduccion, Produccion, ProduccionInput } from './types'

export interface ProduccionCatalogs {
  tipos: CatalogItem[]
  categorias: CatalogItem[]
  areas: CatalogItem[]
  tiposInvestigacion: CatalogItem[]
  carreras: CatalogItem[]
  lineas: CatalogItem[]
  tecnologias: CatalogItem[]
}

interface ProductionRowDto {
  id: number
  title: string
  author: string
  ownerId: number
  productionTypeId: number
  categoryId: number
  knowledgeAreaId: number
  researchTypeId: number
  majorId: number
  researchLineId: number
  year: number
  status: number
  summary: string
  createdAt: string
}

interface ProductionDocumentDto {
  id: number
  productionId: number
  originalFileName: string
  storageKey: string
  contentType: string
  sizeBytes: number | null
  uploadedAt: string
}

interface ProductionDetailDto extends ProductionRowDto {
  technologies: { id: number; name: string }[]
  coauthors: { id: number; productionId: number; coauthorName: string }[]
  document: ProductionDocumentDto | null
}

interface ProductionListResponseDto {
  items: ProductionRowDto[]
  total: number
  page: number
  pageSize: number
}

function nameById(items: CatalogItem[], id: number): string {
  return items.find((item) => item.id === id)?.nombre ?? ''
}

function idByName(items: CatalogItem[], nombre: string): number | undefined {
  return items.find((item) => item.nombre === nombre)?.id
}

function resolveCommon(dto: ProductionRowDto, catalogs: ProduccionCatalogs) {
  return {
    id: dto.id,
    ownerId: dto.ownerId,
    titulo: dto.title,
    autor: dto.author,
    resumen: dto.summary,
    anio: dto.year,
    estado: PRODUCTION_STATUS_BY_CODE[dto.status] ?? ('Borrador' as EstadoProduccion),
    tipo: nameById(catalogs.tipos, dto.productionTypeId),
    tipoId: dto.productionTypeId,
    categoria: nameById(catalogs.categorias, dto.categoryId),
    categoriaId: dto.categoryId,
    area: nameById(catalogs.areas, dto.knowledgeAreaId),
    areaId: dto.knowledgeAreaId,
    tipoInvestigacion: nameById(catalogs.tiposInvestigacion, dto.researchTypeId),
    tipoInvestigacionId: dto.researchTypeId,
    carrera: nameById(catalogs.carreras, dto.majorId),
    carreraId: dto.majorId,
    linea: nameById(catalogs.lineas, dto.researchLineId),
    lineaId: dto.researchLineId,
    fecha: dto.createdAt,
  }
}

function fromRowDto(dto: ProductionRowDto, catalogs: ProduccionCatalogs): Produccion {
  return { ...resolveCommon(dto, catalogs), coautores: '', tecnologias: [], documento: '' }
}

function fromDetailDto(dto: ProductionDetailDto, catalogs: ProduccionCatalogs): Produccion {
  return {
    ...resolveCommon(dto, catalogs),
    coautores: dto.coauthors.map((c) => c.coauthorName).join(', '),
    tecnologias: dto.technologies.map((t) => t.name),
    documento: dto.document?.originalFileName ?? '',
  }
}

function toPayload(input: ProduccionInput, catalogs: ProduccionCatalogs) {
  return {
    title: input.titulo,
    author: input.autor,
    productionTypeId: input.tipoId,
    categoryId: input.categoriaId,
    knowledgeAreaId: input.areaId,
    researchTypeId: input.tipoInvestigacionId,
    majorId: input.carreraId,
    researchLineId: input.lineaId,
    year: input.anio,
    status: CODE_BY_PRODUCTION_STATUS[input.estado],
    summary: input.resumen,
    technologyIds: input.tecnologias
      .map((nombre) => idByName(catalogs.tecnologias, nombre))
      .filter((id): id is number => id !== undefined),
    coauthorNames: input.coautores
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean),
  }
}

export const produccionApi = {
  async list(getToken: GetToken, catalogs: ProduccionCatalogs): Promise<Produccion[]> {
    const response = await apiFetch<ProductionListResponseDto>('/api/productions?pageSize=100', getToken)
    return response.items.map((item) => fromRowDto(item, catalogs))
  },

  async getById(getToken: GetToken, id: number, catalogs: ProduccionCatalogs): Promise<Produccion> {
    const dto = await apiFetch<ProductionDetailDto>(`/api/productions/${id}`, getToken)
    return fromDetailDto(dto, catalogs)
  },

  async create(getToken: GetToken, input: ProduccionInput, catalogs: ProduccionCatalogs): Promise<Produccion> {
    const dto = await apiFetch<ProductionRowDto>('/api/productions', getToken, {
      method: 'POST',
      body: JSON.stringify(toPayload(input, catalogs)),
    })
    return fromRowDto(dto, catalogs)
  },

  async update(
    getToken: GetToken,
    id: number,
    input: ProduccionInput,
    catalogs: ProduccionCatalogs,
  ): Promise<Produccion> {
    const dto = await apiFetch<ProductionRowDto>(`/api/productions/${id}`, getToken, {
      method: 'PUT',
      body: JSON.stringify(toPayload(input, catalogs)),
    })
    return fromRowDto(dto, catalogs)
  },

  async remove(getToken: GetToken, id: number): Promise<void> {
    await apiFetch<void>(`/api/productions/${id}`, getToken, { method: 'DELETE' })
  },

  async uploadDocumento(getToken: GetToken, id: number, file: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', file)
    await apiUpload(`/api/productions/${id}/document`, getToken, formData)
  },

  async downloadDocumento(getToken: GetToken, id: number, fileName: string): Promise<void> {
    const blob = await apiDownload(`/api/productions/${id}/document/file`, getToken)
    const url = URL.createObjectURL(blob)
    const link = window.document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  },

  async previewDocumento(getToken: GetToken, id: number): Promise<string> {
    const blob = await apiDownload(`/api/productions/${id}/document/file`, getToken)
    return URL.createObjectURL(blob)
  },
}
