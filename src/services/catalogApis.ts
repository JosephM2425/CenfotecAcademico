import { createEntityApi } from './entityApi'
import {
  areasSeed,
  carrerasSeed,
  categoriasSeed,
  lineasSeed,
  tecnologiasSeed,
  tiposInvestigacionSeed,
  tiposProduccionSeed,
} from './seedData'
import type { CatalogItem } from './types'

// Singleton stores shared across features: the maintenance pages (CRUD)
// and the producción form (dropdown options) read/write the same data.
export const tiposProduccionApi = createEntityApi<CatalogItem>(tiposProduccionSeed)
export const categoriasApi = createEntityApi<CatalogItem>(categoriasSeed)
export const areasApi = createEntityApi<CatalogItem>(areasSeed)
export const tecnologiasApi = createEntityApi<CatalogItem>(tecnologiasSeed)
export const tiposInvestigacionApi = createEntityApi<CatalogItem>(tiposInvestigacionSeed)
export const carrerasApi = createEntityApi<CatalogItem>(carrerasSeed)
export const lineasApi = createEntityApi<CatalogItem>(lineasSeed)
