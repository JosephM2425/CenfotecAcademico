import type { Rol } from '../services/types'
import { useAuth } from './useAuth'

export interface RolePermissions {
  role: Rol
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canAdmin: boolean
}

/** Derives permissions from the logged-in user's role — there is no standalone role switcher anymore. */
export function useRole(): RolePermissions {
  const { user } = useAuth()
  const role: Rol = user?.rol ?? 'Estudiante'

  return {
    role,
    canCreate: ['Administrador', 'Docente', 'Investigador'].includes(role),
    canEdit: ['Administrador', 'Docente'].includes(role),
    canDelete: role === 'Administrador',
    canAdmin: role === 'Administrador',
  }
}
