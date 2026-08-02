import { apiFetch, type GetToken } from './apiClient'
import type { CatalogItem } from './types'

interface CatalogDto {
  id: number
  name: string
  description: string
}

function fromDto(dto: CatalogDto): CatalogItem {
  return { id: dto.id, nombre: dto.name, descripcion: dto.description }
}

function toDto(input: Partial<Omit<CatalogItem, 'id'>>) {
  const dto: Partial<Pick<CatalogDto, 'name' | 'description'>> = {}
  if (input.nombre !== undefined) dto.name = input.nombre
  if (input.descripcion !== undefined) dto.description = input.descripcion
  return dto
}

export interface CatalogApi {
  list(getToken: GetToken): Promise<CatalogItem[]>
  getById(getToken: GetToken, id: number): Promise<CatalogItem>
  create(getToken: GetToken, input: Omit<CatalogItem, 'id'>): Promise<CatalogItem>
  update(getToken: GetToken, id: number, input: Partial<Omit<CatalogItem, 'id'>>): Promise<CatalogItem>
  remove(getToken: GetToken, id: number): Promise<void>
}

export function createCatalogApi(path: string): CatalogApi {
  return {
    async list(getToken) {
      const rows = await apiFetch<CatalogDto[]>(path, getToken)
      return rows.map(fromDto)
    },
    async getById(getToken, id) {
      const dto = await apiFetch<CatalogDto>(`${path}/${id}`, getToken)
      return fromDto(dto)
    },
    async create(getToken, input) {
      const dto = await apiFetch<CatalogDto>(path, getToken, {
        method: 'POST',
        body: JSON.stringify(toDto(input)),
      })
      return fromDto(dto)
    },
    async update(getToken, id, input) {
      const dto = await apiFetch<CatalogDto>(`${path}/${id}`, getToken, {
        method: 'PUT',
        body: JSON.stringify(toDto(input)),
      })
      return fromDto(dto)
    },
    async remove(getToken, id) {
      await apiFetch<void>(`${path}/${id}`, getToken, { method: 'DELETE' })
    },
  }
}
