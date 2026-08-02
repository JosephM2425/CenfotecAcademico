import type { Rol } from '../services/types'
import { useCurrentUsuario } from './useCurrentUsuario'

export interface RolePermissions {
  role: Rol
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canAdmin: boolean
}

/** Derives permissions from the logged-in user's role — there is no standalone role switcher anymore. */
export function useRole(): RolePermissions {
  const { usuario } = useCurrentUsuario()
  const role: Rol = usuario?.rol ?? 'Estudiante'

  return {
    role,
    canCreate: ['Administrador', 'Docente', 'Investigador'].includes(role),
    canEdit: ['Administrador', 'Docente'].includes(role),
    canDelete: role === 'Administrador',
    canAdmin: role === 'Administrador',
  }
}
