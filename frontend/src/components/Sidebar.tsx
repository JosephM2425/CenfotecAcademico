import { NavLink } from 'react-router-dom'
import { catalogConfigs } from '../features/catalogos/catalogConfig'
import { useRole } from '../hooks/useRole'
import { paths } from '../routes/paths'
import type { Rol } from '../services/types'

interface NavItem {
  to: string
  label: string
  icon: string
  roles?: Rol[]
}

const mainNavItems: NavItem[] = [
  {
    to: paths.dashboard,
    label: 'Dashboard',
    icon: 'bi-speedometer2',
    roles: ['Administrador', 'Coordinador', 'Docente', 'Investigador'],
  },
]

const produccionNavItems: NavItem[] = [
  { to: paths.produccionList, label: 'Listar Producción', icon: 'bi-journal-text' },
  {
    to: paths.produccionNuevo,
    label: 'Registrar Producción',
    icon: 'bi-plus-circle',
    roles: ['Administrador', 'Docente', 'Investigador'],
  },
]

const mantenimientoNavItems: NavItem[] = [
  { to: paths.usuarios, label: 'Usuarios', icon: 'bi-people', roles: ['Administrador'] },
  ...catalogConfigs.map((catalog) => ({
    to: paths.catalogo(catalog.key),
    label: catalog.sidebarLabel,
    icon: catalog.icon,
    roles: ['Administrador'] as Rol[],
  })),
]

interface SidebarProps {
  open: boolean
  onNavigate: () => void
  ref?: React.Ref<HTMLElement>
}

export function Sidebar({ open, onNavigate, ref }: SidebarProps) {
  const { role } = useRole()
  const isVisible = (item: NavItem) => !item.roles || item.roles.includes(role)

  return (
    <aside ref={ref} className={`sidebar ${open ? 'show' : ''}`}>
      <div className="sidebar-header">
        <i className="bi bi-mortarboard-fill fs-3" />
        <h5>CenfoAcadémico</h5>
        <small>Producción Académica</small>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">Principal</div>
        {mainNavItems.filter(isVisible).map((item) => (
          <NavLink key={item.to} to={item.to} end onClick={onNavigate}>
            <i className={`bi ${item.icon}`} /> {item.label}
          </NavLink>
        ))}

        <div className="nav-section">Producción Académica</div>
        {produccionNavItems.filter(isVisible).map((item) => (
          <NavLink key={item.to} to={item.to} end onClick={onNavigate}>
            <i className={`bi ${item.icon}`} /> {item.label}
          </NavLink>
        ))}

        {role === 'Administrador' && (
          <>
            <div className="nav-section">Mantenimientos</div>
            {mantenimientoNavItems.filter(isVisible).map((item) => (
              <NavLink key={item.to} to={item.to} end onClick={onNavigate}>
                <i className={`bi ${item.icon}`} /> {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>
    </aside>
  )
}
