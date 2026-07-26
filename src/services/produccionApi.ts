import { createEntityApi } from './entityApi'
import { produccionSeed } from './seedData'
import { storageKeys } from './storageKeys'
import type { Produccion } from './types'

export const produccionApi = createEntityApi<Produccion>(produccionSeed, storageKeys.produccion)
