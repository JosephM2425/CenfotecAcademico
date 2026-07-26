import { describe, expect, it } from 'vitest'
import { createEntityApi } from './entityApi'

interface Widget {
  id: number
  name: string
}

describe('createEntityApi', () => {
  it('lists the seeded items', async () => {
    const api = createEntityApi<Widget>([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ])
    await expect(api.list()).resolves.toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ])
  })

  it('creates items with an auto-incremented id', async () => {
    const api = createEntityApi<Widget>([{ id: 1, name: 'a' }])
    const created = await api.create({ name: 'b' })
    expect(created).toEqual({ id: 2, name: 'b' })
    await expect(api.list()).resolves.toHaveLength(2)
  })

  it('starts ids at 1 for an empty seed', async () => {
    const api = createEntityApi<Widget>([])
    const created = await api.create({ name: 'first' })
    expect(created.id).toBe(1)
  })

  it('updates an existing item by id', async () => {
    const api = createEntityApi<Widget>([{ id: 1, name: 'a' }])
    const updated = await api.update(1, { name: 'renamed' })
    expect(updated).toEqual({ id: 1, name: 'renamed' })
  })

  it('throws when updating a missing id', async () => {
    const api = createEntityApi<Widget>([{ id: 1, name: 'a' }])
    await expect(api.update(999, { name: 'x' })).rejects.toThrow()
  })

  it('removes an item by id', async () => {
    const api = createEntityApi<Widget>([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ])
    await api.remove(1)
    await expect(api.list()).resolves.toEqual([{ id: 2, name: 'b' }])
  })

  it('getById finds the matching item or returns undefined', async () => {
    const api = createEntityApi<Widget>([{ id: 1, name: 'a' }])
    await expect(api.getById(1)).resolves.toEqual({ id: 1, name: 'a' })
    await expect(api.getById(2)).resolves.toBeUndefined()
  })
})
