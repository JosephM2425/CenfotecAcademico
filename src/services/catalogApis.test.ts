import { describe, expect, it } from 'vitest'
import { createEntityApi } from './entityApi'
import { tiposProduccionSeed } from './seedData'
import type { CatalogItem } from './types'

describe('catalog entity apis', () => {
  it('keeps independent state per catalog instance, even with identical seed data', async () => {
    const apiA = createEntityApi<CatalogItem>(tiposProduccionSeed)
    const apiB = createEntityApi<CatalogItem>(tiposProduccionSeed)

    await apiA.create({ nombre: 'Nuevo', descripcion: 'desc' })

    const [listA, listB] = await Promise.all([apiA.list(), apiB.list()])
    expect(listA).toHaveLength(tiposProduccionSeed.length + 1)
    expect(listB).toHaveLength(tiposProduccionSeed.length)
  })
})
