import Button from 'react-bootstrap/Button'
import { useAuth } from '../hooks/useAuth'

interface TopNavbarProps {
  title: string
  onToggleSidebar: () => void
}

export function TopNavbar({ title, onToggleSidebar }: TopNavbarProps) {
  const { user, logout } = useAuth()

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center gap-3">
        <button type="button" className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Alternar menú">
          <i className="bi bi-list" />
        </button>
        <span className="page-title">{title}</span>
      </div>
      <div className="user-menu">
        <i className="bi bi-person-circle fs-5" />
        <div className="user-menu-info">
          <span className="user-menu-name">{user?.nombre}</span>
          <small className="user-menu-role">{user?.rol}</small>
        </div>
        <Button size="sm" variant="outline-secondary" onClick={logout} title="Cerrar sesión">
          <i className="bi bi-box-arrow-right" />
        </Button>
      </div>
    </header>
  )
}
