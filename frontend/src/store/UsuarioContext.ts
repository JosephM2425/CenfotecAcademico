import { createContext } from 'react'
import type { AuthUser } from '../services/types'

export interface UsuarioContextValue {
  usuario: AuthUser | null
  isLoaded: boolean
}

export const UsuarioContext = createContext<UsuarioContextValue | undefined>(undefined)
