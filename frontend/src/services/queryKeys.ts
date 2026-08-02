export const queryKeys = {
  produccion: ['produccion'] as const,
  produccionDetail: (id: number) => ['produccion', id] as const,
  usuarios: ['usuarios'] as const,
  catalog: (key: string) => ['catalog', key] as const,
  me: ['me'] as const,
  dashboard: ['dashboard'] as const,
}
