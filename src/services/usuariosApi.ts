import { createEntityApi } from './entityApi'
import { usuariosSeed } from './seedData'
import { storageKeys } from './storageKeys'
import type { Usuario } from './types'

export const usuariosApi = createEntityApi<Usuario>(usuariosSeed, storageKeys.usuarios)
