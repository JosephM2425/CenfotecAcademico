const PREFIX = 'cenfoacademico'

export const storageKeys = {
  auth: `${PREFIX}:auth`,
  produccion: `${PREFIX}:produccion`,
  usuarios: `${PREFIX}:usuarios`,
  catalog: (key: string) => `${PREFIX}:catalog:${key}`,
}
