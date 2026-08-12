import { useClerk } from "@clerk/react";
import Button from "react-bootstrap/Button";
import { useCurrentUsuario } from "../hooks/useCurrentUsuario";
import { paths } from "../routes/paths";
import { UserAvatar } from "@clerk/react";

interface TopNavbarProps {
  title: string;
  onToggleSidebar: () => void;
}

export function TopNavbar({ title, onToggleSidebar }: TopNavbarProps) {
  const { usuario } = useCurrentUsuario();
  const { signOut } = useClerk();

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Alternar menú"
        >
          <i className="bi bi-list" />
        </button>
        <span className="page-title">{title}</span>
      </div>
      <div className="user-menu">
        <UserAvatar />
        <div className="user-menu-info">
          <span className="user-menu-name">{usuario?.nombre} Prueba</span>
          <small className="user-menu-role">{usuario?.rol}</small>
        </div>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => signOut({ redirectUrl: paths.login })}
          title="Cerrar sesión"
        >
          <i className="bi bi-box-arrow-right" />
        </Button>
      </div>
    </header>
  );
}
