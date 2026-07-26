import { useMemo, useState, type ReactNode } from 'react'
import type { Rol } from '../services/types'
import { RoleContext, type RoleContextValue } from './RoleContext'

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Rol>('Administrador')

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      setRole,
      canCreate: ['Administrador', 'Docente', 'Investigador'].includes(role),
      canEdit: ['Administrador', 'Docente'].includes(role),
      canDelete: role === 'Administrador',
      canAdmin: role === 'Administrador',
    }),
    [role],
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}
