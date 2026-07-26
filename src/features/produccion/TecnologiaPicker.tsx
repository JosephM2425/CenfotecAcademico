import Button from 'react-bootstrap/Button'
import { useCatalogList } from '../catalogos/useCatalogQueries'

interface TecnologiaPickerProps {
  selected: string[]
  onToggle: (nombre: string) => void
  isInvalid?: boolean
}

export function TecnologiaPicker({ selected, onToggle, isInvalid }: TecnologiaPickerProps) {
  const { data: tecnologias = [] } = useCatalogList('tecnologias')

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {tecnologias.map((tech) => {
          const checked = selected.includes(tech.nombre)
          return (
            <Button
              key={tech.id}
              type="button"
              size="sm"
              variant={checked ? 'primary' : 'outline-secondary'}
              onClick={() => onToggle(tech.nombre)}
            >
              {tech.nombre}
            </Button>
          )
        })}
      </div>
      {isInvalid && <div className="invalid-feedback d-block">Seleccione al menos una tecnología.</div>}
    </>
  )
}
