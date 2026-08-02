export type Rol = 'Administrador' | 'Docente' | 'Investigador' | 'Estudiante'

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
  categoria: string
  area: string
  tecnologias: string[]
  tipoInvestigacion: string
  carrera: string
  linea: string
  anio: number
  estado: EstadoProduccion
  resumen: string
  fecha: string
  documento: string
}

export type ProduccionInput = Omit<Produccion, 'id'>

export interface Usuario {
  id: number
  nombre: string
  email: string
  password: string
  rol: Rol
  estado: EstadoUsuario
  fechaRegistro: string
}

export type UsuarioInput = Omit<Usuario, 'id'>

/** The logged-in user, without the password — this is what gets stored in the session. */
export type AuthUser = Omit<Usuario, 'password'>
