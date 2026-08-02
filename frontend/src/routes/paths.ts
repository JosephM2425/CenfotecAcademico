export const paths = {
  login: '/login',
  dashboard: '/',
  produccionList: '/produccion',
  produccionNuevo: '/produccion/nuevo',
  produccionEditar: (id: number | string) => `/produccion/${id}/editar`,
  produccionDetalle: (id: number | string) => `/produccion/${id}`,
  usuarios: '/mantenimientos/usuarios',
  catalogo: (key: string) => `/mantenimientos/${key}`,
}
