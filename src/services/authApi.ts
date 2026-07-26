import { usuariosApi } from './usuariosApi'
import type { AuthUser } from './types'

export async function login(email: string, password: string): Promise<AuthUser> {
  const usuarios = await usuariosApi.list()
  const match = usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

  if (!match || match.password !== password) {
    throw new Error('Correo o contraseña incorrectos.')
  }
  if (match.estado !== 'Activo') {
    throw new Error('Este usuario está inactivo. Contacte a un administrador.')
  }

  return {
    id: match.id,
    nombre: match.nombre,
    email: match.email,
    rol: match.rol,
    estado: match.estado,
    fechaRegistro: match.fechaRegistro,
  }
}
