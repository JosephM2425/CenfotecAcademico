import type { EstadoUsuario, Rol } from './types'

export const ROLE_BY_CODE: Record<number, Rol> = {
  1: 'Administrador',
  2: 'Coordinador',
  3: 'Docente',
  4: 'Investigador',
  5: 'Estudiante',
}

export const CODE_BY_ROLE: Record<Rol, number> = {
  Administrador: 1,
  Coordinador: 2,
  Docente: 3,
  Investigador: 4,
  Estudiante: 5,
}

export const STATUS_BY_CODE: Record<number, EstadoUsuario> = {
  1: 'Activo',
  2: 'Inactivo',
}

export const CODE_BY_STATUS: Record<EstadoUsuario, number> = {
  Activo: 1,
  Inactivo: 2,
}
