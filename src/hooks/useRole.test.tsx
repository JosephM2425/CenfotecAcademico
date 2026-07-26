import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import type { AuthUser, Rol } from '../services/types'
import { AuthContext } from '../store/AuthContext'
import { useRole } from './useRole'

function makeUser(rol: Rol): AuthUser {
  return {
    id: 1,
    nombre: 'Usuario de Prueba',
    email: 'prueba@ucenfotec.ac.cr',
    rol,
    estado: 'Activo',
    fechaRegistro: '2024-01-01',
  }
}

function wrapperWithUser(user: AuthUser | null) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AuthContext.Provider value={{ user, login: async () => {}, logout: () => {} }}>
        {children}
      </AuthContext.Provider>
    )
  }
}

describe('useRole', () => {
  it('gives an Administrador full permissions', () => {
    const { result } = renderHook(() => useRole(), { wrapper: wrapperWithUser(makeUser('Administrador')) })
    expect(result.current.canCreate).toBe(true)
    expect(result.current.canEdit).toBe(true)
    expect(result.current.canDelete).toBe(true)
    expect(result.current.canAdmin).toBe(true)
  })

  it('restricts Estudiante to read-only access', () => {
    const { result } = renderHook(() => useRole(), { wrapper: wrapperWithUser(makeUser('Estudiante')) })
    expect(result.current.canCreate).toBe(false)
    expect(result.current.canEdit).toBe(false)
    expect(result.current.canDelete).toBe(false)
    expect(result.current.canAdmin).toBe(false)
  })

  it('allows Investigador to create but not edit or delete', () => {
    const { result } = renderHook(() => useRole(), { wrapper: wrapperWithUser(makeUser('Investigador')) })
    expect(result.current.canCreate).toBe(true)
    expect(result.current.canEdit).toBe(false)
    expect(result.current.canDelete).toBe(false)
  })

  it('allows Docente to create and edit but not delete', () => {
    const { result } = renderHook(() => useRole(), { wrapper: wrapperWithUser(makeUser('Docente')) })
    expect(result.current.canCreate).toBe(true)
    expect(result.current.canEdit).toBe(true)
    expect(result.current.canDelete).toBe(false)
  })

  it('falls back to Estudiante permissions when there is no logged-in user', () => {
    const { result } = renderHook(() => useRole(), { wrapper: wrapperWithUser(null) })
    expect(result.current.role).toBe('Estudiante')
    expect(result.current.canCreate).toBe(false)
  })

  it('throws when used outside an AuthProvider', () => {
    expect(() => renderHook(() => useRole())).toThrow(/AuthProvider/)
  })
})
