import { Link } from 'react-router-dom'
import { paths } from '../routes/paths'

export function NotFoundPage() {
  return (
    <div className="detail-section text-center py-5">
      <i className="bi bi-signpost-2" style={{ fontSize: '3rem', color: 'var(--gray-medium)' }} />
      <h4 className="mt-3 mb-2">Página no encontrada</h4>
      <p className="text-muted">La página que busca no existe o fue movida.</p>
      <Link to={paths.dashboard} className="btn btn-primary-custom">
        Ir al Dashboard
      </Link>
    </div>
  )
}
