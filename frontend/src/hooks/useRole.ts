import type { Rol } from '../services/types'
import { useCurrentUsuario } from './useCurrentUsuario'

export interface RolePermissions {
  role: Rol
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canAdmin: boolean
}

export function useRole(): RolePermissions {
  const { usuario } = useCurrentUsuario()
  const role: Rol = usuario?.rol ?? 'Estudiante'

  return {
    role,
    canCreate: ['Administrador', 'Coordinador', 'Docente', 'Investigador'].includes(role),
    canEdit: ['Administrador', 'Coordinador', 'Docente'].includes(role),
    canDelete: ['Administrador', 'Coordinador'].includes(role),
    canAdmin: role === 'Administrador',
  }
}
