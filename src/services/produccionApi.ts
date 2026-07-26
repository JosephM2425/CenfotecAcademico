import { createEntityApi } from './entityApi'
import { produccionSeed } from './seedData'
import type { Produccion } from './types'

export const produccionApi = createEntityApi<Produccion>(produccionSeed)
