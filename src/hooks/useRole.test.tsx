import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { RoleProvider } from '../store/RoleProvider'
import { useRole } from './useRole'

function wrapper({ children }: { children: ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>
}

describe('useRole', () => {
  it('defaults to Administrador with full permissions', () => {
    const { result } = renderHook(() => useRole(), { wrapper })
    expect(result.current.role).toBe('Administrador')
    expect(result.current.canCreate).toBe(true)
    expect(result.current.canEdit).toBe(true)
    expect(result.current.canDelete).toBe(true)
    expect(result.current.canAdmin).toBe(true)
  })

  it('restricts Estudiante to read-only access', () => {
    const { result } = renderHook(() => useRole(), { wrapper })
    act(() => result.current.setRole('Estudiante'))
    expect(result.current.canCreate).toBe(false)
    expect(result.current.canEdit).toBe(false)
    expect(result.current.canDelete).toBe(false)
    expect(result.current.canAdmin).toBe(false)
  })

  it('allows Investigador to create but not edit or delete', () => {
    const { result } = renderHook(() => useRole(), { wrapper })
    act(() => result.current.setRole('Investigador'))
    expect(result.current.canCreate).toBe(true)
    expect(result.current.canEdit).toBe(false)
    expect(result.current.canDelete).toBe(false)
  })

  it('allows Docente to create and edit but not delete', () => {
    const { result } = renderHook(() => useRole(), { wrapper })
    act(() => result.current.setRole('Docente'))
    expect(result.current.canCreate).toBe(true)
    expect(result.current.canEdit).toBe(true)
    expect(result.current.canDelete).toBe(false)
  })

  it('throws when used outside a RoleProvider', () => {
    expect(() => renderHook(() => useRole())).toThrow(/RoleProvider/)
  })
})
