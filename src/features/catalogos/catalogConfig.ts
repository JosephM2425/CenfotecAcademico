import {
  areasApi,
  carrerasApi,
  categoriasApi,
  lineasApi,
  tecnologiasApi,
  tiposInvestigacionApi,
  tiposProduccionApi,
} from '../../services/catalogApis'
import type { EntityApi } from '../../services/entityApi'
import type { CatalogItem } from '../../services/types'

export interface CatalogConfig {
  key: string
  sidebarLabel: string
  pageTitle: string
  icon: string
  searchNoun: string
  addButtonLabel: string
  addModalTitle: string
  editModalTitle: string
  api: EntityApi<CatalogItem>
}

export const catalogConfigs: CatalogConfig[] = [
  {
    key: 'tipos',
    sidebarLabel: 'Tipos de Producción',
    pageTitle: 'Tipos de Producción Académica',
    icon: 'bi-tags',
    searchNoun: 'tipo',
    addButtonLabel: 'Nuevo Tipo',
    addModalTitle: 'Nuevo Tipo de Producción',
    editModalTitle: 'Editar Tipo',
    api: tiposProduccionApi,
  },
  {
    key: 'categorias',
    sidebarLabel: 'Categorías',
    pageTitle: 'Categorías',
    icon: 'bi-bookmark',
    searchNoun: 'categoría',
    addButtonLabel: 'Nueva Categoría',
    addModalTitle: 'Nueva Categoría',
    editModalTitle: 'Editar Categoría',
    api: categoriasApi,
  },
  {
    key: 'areas',
    sidebarLabel: 'Áreas de Conocimiento',
    pageTitle: 'Áreas de Conocimiento',
    icon: 'bi-diagram-3',
    searchNoun: 'área',
    addButtonLabel: 'Nueva Área',
    addModalTitle: 'Nueva Área de Conocimiento',
    editModalTitle: 'Editar Área',
    api: areasApi,
  },
  {
    key: 'tecnologias',
    sidebarLabel: 'Tecnologías',
    pageTitle: 'Tecnologías',
    icon: 'bi-cpu',
    searchNoun: 'tecnología',
    addButtonLabel: 'Nueva Tecnología',
    addModalTitle: 'Nueva Tecnología',
    editModalTitle: 'Editar Tecnología',
    api: tecnologiasApi,
  },
  {
    key: 'tipos-investigacion',
    sidebarLabel: 'Tipos de Investigación',
    pageTitle: 'Tipos de Investigación',
    icon: 'bi-search',
    searchNoun: 'tipo de investigación',
    addButtonLabel: 'Nuevo Tipo',
    addModalTitle: 'Nuevo Tipo de Investigación',
    editModalTitle: 'Editar Tipo de Investigación',
    api: tiposInvestigacionApi,
  },
  {
    key: 'carreras',
    sidebarLabel: 'Carreras',
    pageTitle: 'Carreras Académicas',
    icon: 'bi-building',
    searchNoun: 'carrera',
    addButtonLabel: 'Nueva Carrera',
    addModalTitle: 'Nueva Carrera',
    editModalTitle: 'Editar Carrera',
    api: carrerasApi,
  },
  {
    key: 'lineas',
    sidebarLabel: 'Líneas de Investigación',
    pageTitle: 'Líneas de Investigación',
    icon: 'bi-list-nested',
    searchNoun: 'línea de investigación',
    addButtonLabel: 'Nueva Línea',
    addModalTitle: 'Nueva Línea de Investigación',
    editModalTitle: 'Editar Línea de Investigación',
    api: lineasApi,
  },
]

export function getCatalogConfig(key: string): CatalogConfig {
  const config = catalogConfigs.find((c) => c.key === key)
  if (!config) throw new Error(`Catálogo desconocido: ${key}`)
  return config
}
