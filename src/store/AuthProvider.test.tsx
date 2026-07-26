import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useAuth } from '../hooks/useAuth'
import { storageKeys } from '../services/storageKeys'
import { AuthProvider } from './AuthProvider'

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('logs a seeded user in and persists the session', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBeNull()

    await act(async () => {
      await result.current.login('admin@ucenfotec.ac.cr', 'Cenfotec2024!')
    })

    expect(result.current.user?.rol).toBe('Administrador')
    expect(localStorage.getItem(storageKeys.auth)).not.toBeNull()
  })

  it('rejects an incorrect password and does not log in', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await expect(
      act(async () => {
        await result.current.login('admin@ucenfotec.ac.cr', 'contraseña-incorrecta')
      }),
    ).rejects.toThrow(/incorrectos/)

    expect(result.current.user).toBeNull()
  })

  it('logs out and clears the persisted session', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('admin@ucenfotec.ac.cr', 'Cenfotec2024!')
    })
    act(() => result.current.logout())

    expect(result.current.user).toBeNull()
    expect(localStorage.getItem(storageKeys.auth)).toBeNull()
  })

  it('restores a previously persisted session on mount', async () => {
    const first = renderHook(() => useAuth(), { wrapper })
    await act(async () => {
      await first.result.current.login('admin@ucenfotec.ac.cr', 'Cenfotec2024!')
    })

    const second = renderHook(() => useAuth(), { wrapper })
    expect(second.result.current.user?.email).toBe('admin@ucenfotec.ac.cr')
  })
})
