import { useContext } from 'react'
import { UsuarioContext } from '../store/UsuarioContext'

export function useCurrentUsuario() {
  const ctx = useContext(UsuarioContext)
  if (!ctx) throw new Error('useCurrentUsuario must be used within a UsuarioProvider')
  return ctx
}
