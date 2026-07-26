import type { EstadoProduccion } from '../services/types'

const STATUS_COLORS: Record<EstadoProduccion, string> = {
  Publicado: 'success',
  'En revisión': 'warning',
  Borrador: 'secondary',
  Rechazado: 'danger',
}

export function StatusBadge({ status }: { status: EstadoProduccion }) {
  const color = STATUS_COLORS[status] ?? 'secondary'
  return <span className={`badge bg-${color} badge-status`}>{status}</span>
}
