import type { EstadoProduccion } from './types'

export const PRODUCTION_STATUS_BY_CODE: Record<number, EstadoProduccion> = {
  1: 'Publicado',
  2: 'En revisión',
  3: 'Borrador',
  4: 'Rechazado',
}

export const CODE_BY_PRODUCTION_STATUS: Record<EstadoProduccion, number> = {
  Publicado: 1,
  'En revisión': 2,
  Borrador: 3,
  Rechazado: 4,
}
