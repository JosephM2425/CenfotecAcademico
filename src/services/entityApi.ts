import { delay } from './delay'

export interface EntityApi<T extends { id: number }> {
  list(): Promise<T[]>
  getById(id: number): Promise<T | undefined>
  create(input: Omit<T, 'id'>): Promise<T>
  update(id: number, input: Partial<Omit<T, 'id'>>): Promise<T>
  remove(id: number): Promise<void>
}

/** Generic in-memory async CRUD store, simulating a network-backed API. */
export function createEntityApi<T extends { id: number }>(seed: T[]): EntityApi<T> {
  let items = [...seed]

  return {
    async list() {
      await delay()
      return [...items]
    },
    async getById(id) {
      await delay()
      return items.find((item) => item.id === id)
    },
    async create(input) {
      await delay()
      const nextId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1
      const created = { ...input, id: nextId } as T
      items = [...items, created]
      return created
    },
    async update(id, input) {
      await delay()
      const index = items.findIndex((item) => item.id === id)
      if (index === -1) throw new Error(`No existe el registro con id ${id}`)
      const updated = { ...items[index], ...input } as T
      items = items.map((item, i) => (i === index ? updated : item))
      return updated
    },
    async remove(id) {
      await delay()
      items = items.filter((item) => item.id !== id)
    },
  }
}
