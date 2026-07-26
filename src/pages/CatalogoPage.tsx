import { useParams } from 'react-router-dom'
import { CatalogMaintenance } from '../features/catalogos/CatalogMaintenance'

export function CatalogoPage() {
  const { catalogKey } = useParams<{ catalogKey: string }>()
  if (!catalogKey) return null
  return <CatalogMaintenance catalogKey={catalogKey} />
}
