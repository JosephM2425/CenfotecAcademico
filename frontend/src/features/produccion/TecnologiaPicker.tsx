import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { useCatalogList } from '../catalogos/useCatalogQueries'

interface TecnologiaPickerProps {
  selected: string[]
  onToggle: (nombre: string) => void
  isInvalid?: boolean
}

export function TecnologiaPicker({ selected, onToggle, isInvalid }: TecnologiaPickerProps) {
  const { data: tecnologias = [] } = useCatalogList('tecnologias')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return tecnologias.filter(
      (tech) => !selected.includes(tech.nombre) && (!term || tech.nombre.toLowerCase().includes(term)),
    )
  }, [tecnologias, selected, search])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  function selectTech(nombre: string) {
    onToggle(nombre)
    setSearch('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (filtered.length > 0) selectTech(filtered[0].nombre)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="tech-picker">
      {selected.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mb-2">
          {selected.map((nombre) => (
            <span key={nombre} className="badge bg-primary tech-picker-chip">
              {nombre}
              <button
                type="button"
                className="tech-picker-chip-remove"
                aria-label={`Quitar ${nombre}`}
                onClick={() => onToggle(nombre)}
              >
                <i className="bi bi-x" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="tech-picker-input-wrap">
        <Form.Control
          type="text"
          placeholder="Buscar tecnología..."
          value={search}
          isInvalid={isInvalid}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
        />
        {isOpen && (
          <ul className="tech-picker-menu">
            {filtered.length === 0 ? (
              <li className="tech-picker-empty">
                {tecnologias.length === selected.length ? 'No hay más tecnologías disponibles' : 'Sin coincidencias'}
              </li>
            ) : (
              filtered.map((tech) => (
                <li key={tech.id}>
                  <button type="button" className="tech-picker-option" onClick={() => selectTech(tech.nombre)}>
                    {tech.nombre}
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {isInvalid && <div className="invalid-feedback d-block">Seleccione al menos una tecnología.</div>}
    </div>
  )
}
