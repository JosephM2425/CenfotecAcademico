import { useCallback, useState, type ReactNode } from 'react'
import { login as loginRequest } from '../services/authApi'
import { readJSON, writeJSON } from '../services/localStorage'
import { storageKeys } from '../services/storageKeys'
import type { AuthUser } from '../services/types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readJSON<AuthUser>(storageKeys.auth))

  const login = useCallback(async (email: string, password: string) => {
    const authUser = await loginRequest(email, password)
    setUser(authUser)
    writeJSON(storageKeys.auth, authUser)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(storageKeys.auth)
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
