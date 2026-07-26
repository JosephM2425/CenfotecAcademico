import { createEntityApi } from './entityApi'
import { usuariosSeed } from './seedData'
import type { Usuario } from './types'

export const usuariosApi = createEntityApi<Usuario>(usuariosSeed)
