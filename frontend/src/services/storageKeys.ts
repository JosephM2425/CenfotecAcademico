const PREFIX = 'cenfoacademico'

export const storageKeys = {
  produccion: `${PREFIX}:produccion`,
  usuarios: `${PREFIX}:usuarios`,
  catalog: (key: string) => `${PREFIX}:catalog:${key}`,
}
