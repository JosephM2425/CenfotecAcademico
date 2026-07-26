import { createContext } from 'react'
import type { Rol } from '../services/types'

export interface RoleContextValue {
  role: Rol
  setRole: (role: Rol) => void
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canAdmin: boolean
}

export const RoleContext = createContext<RoleContextValue | undefined>(undefined)
