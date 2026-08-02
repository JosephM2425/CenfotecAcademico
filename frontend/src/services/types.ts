export type Rol = 'Administrador' | 'Coordinador' | 'Docente' | 'Investigador' | 'Estudiante'

export type EstadoProduccion = 'Publicado' | 'En revisión' | 'Borrador' | 'Rechazado'

export type EstadoUsuario = 'Activo' | 'Inactivo'

export interface CatalogItem {
  id: number
  nombre: string
  descripcion: string
}

export interface Produccion {
  id: number
  titulo: string
  autor: string
  coautores: string
  tipo: string
  tipoId: number
  categoria: string
  categoriaId: number
  area: string
  areaId: number
  tecnologias: string[]
  tipoInvestigacion: string
  tipoInvestigacionId: number
  carrera: string
  carreraId: number
  linea: string
  lineaId: number
  anio: number
  estado: EstadoProduccion
  resumen: string
  fecha: string
  documento: string
}

export interface ProduccionInput {
  titulo: string
  autor: string
  coautores: string
  resumen: string
  anio: number
  estado: EstadoProduccion
  tipoId: number
  categoriaId: number
  areaId: number
  tipoInvestigacionId: number
  carreraId: number
  lineaId: number
  tecnologias: string[]
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  password?: string
  rol: Rol
  estado: EstadoUsuario
  fechaRegistro: string
}

export type UsuarioInput = Omit<Usuario, 'id'>

export type AuthUser = Omit<Usuario, 'password'>
