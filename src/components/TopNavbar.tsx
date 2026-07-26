import Form from 'react-bootstrap/Form'
import { useRole } from '../hooks/useRole'
import type { Rol } from '../services/types'

const ROLES: Rol[] = ['Administrador', 'Docente', 'Investigador', 'Estudiante']

interface TopNavbarProps {
  title: string
  onToggleSidebar: () => void
}

export function TopNavbar({ title, onToggleSidebar }: TopNavbarProps) {
  const { role, setRole } = useRole()

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center gap-3">
        <button type="button" className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Alternar menú">
          <i className="bi bi-list" />
        </button>
        <span className="page-title">{title}</span>
      </div>
      <div className="role-selector">
        <i className="bi bi-person-badge" />
        <Form.Select size="sm" value={role} onChange={(e) => setRole(e.target.value as Rol)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Form.Select>
      </div>
    </header>
  )
}
