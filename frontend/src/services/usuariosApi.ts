import { apiFetch, type GetToken } from './apiClient'
import type { Usuario, UsuarioInput } from './types'
import { CODE_BY_ROLE, CODE_BY_STATUS, ROLE_BY_CODE, STATUS_BY_CODE } from './userCodes'

interface UserDto {
  id: number
  name: string
  email: string
  role: number
  status: number
  registeredAt: string
}

function fromDto(dto: UserDto): Usuario {
  return {
    id: dto.id,
    nombre: dto.name,
    email: dto.email,
    rol: ROLE_BY_CODE[dto.role] ?? 'Estudiante',
    estado: STATUS_BY_CODE[dto.status] ?? 'Activo',
    fechaRegistro: dto.registeredAt,
  }
}

export const usuariosApi = {
  async list(getToken: GetToken): Promise<Usuario[]> {
    const rows = await apiFetch<UserDto[]>('/api/users', getToken)
    return rows.map(fromDto)
  },

  async getById(getToken: GetToken, id: number): Promise<Usuario> {
    const dto = await apiFetch<UserDto>(`/api/users/${id}`, getToken)
    return fromDto(dto)
  },

  async create(getToken: GetToken, input: UsuarioInput): Promise<Usuario> {
    const dto = await apiFetch<UserDto>('/api/users', getToken, {
      method: 'POST',
      body: JSON.stringify({
        name: input.nombre,
        email: input.email,
        password: input.password,
        role: CODE_BY_ROLE[input.rol],
        status: CODE_BY_STATUS[input.estado],
      }),
    })
    return fromDto(dto)
  },

  async update(getToken: GetToken, id: number, input: Partial<UsuarioInput>): Promise<Usuario> {
    const dto = await apiFetch<UserDto>(`/api/users/${id}`, getToken, {
      method: 'PUT',
      body: JSON.stringify({
        ...(input.nombre !== undefined ? { name: input.nombre } : {}),
        ...(input.email !== undefined ? { email: input.email } : {}),
        ...(input.password ? { password: input.password } : {}),
        ...(input.rol !== undefined ? { role: CODE_BY_ROLE[input.rol] } : {}),
        ...(input.estado !== undefined ? { status: CODE_BY_STATUS[input.estado] } : {}),
      }),
    })
    return fromDto(dto)
  },

  async remove(getToken: GetToken, id: number): Promise<void> {
    await apiFetch<void>(`/api/users/${id}`, getToken, { method: 'DELETE' })
  },
}
