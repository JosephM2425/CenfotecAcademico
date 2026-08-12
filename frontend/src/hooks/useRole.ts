import type { Rol } from '../services/types'
import { useCurrentUsuario } from './useCurrentUsuario'

export interface RolePermissions {
  role: Rol
  userId: number | undefined
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canAdmin: boolean
  canEditProduccion: (ownerId: number) => boolean
}

const CAN_EDIT_OWN_PRODUCCION: Rol[] = ['Docente', 'Investigador']

export function useRole(): RolePermissions {
  const { usuario } = useCurrentUsuario()
  const role: Rol = usuario?.rol ?? 'Estudiante'

  return {
    role,
    userId: usuario?.id,
    canCreate: ['Administrador', 'Coordinador', 'Docente', 'Investigador'].includes(role),
    canEdit: ['Administrador', 'Coordinador', 'Docente'].includes(role),
    canDelete: ['Administrador', 'Coordinador'].includes(role),
    canAdmin: role === 'Administrador',
    canEditProduccion: (ownerId) =>
      role === 'Administrador' ||
      role === 'Coordinador' ||
      (CAN_EDIT_OWN_PRODUCCION.includes(role) && usuario?.id === ownerId),
  }
}
