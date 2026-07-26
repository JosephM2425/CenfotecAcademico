import { useEffect, useState, type FormEvent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCatalogList } from '../catalogos/useCatalogQueries'
import { useToast } from '../../hooks/useToast'
import { paths } from '../../routes/paths'
import type { EstadoProduccion, ProduccionInput } from '../../services/types'
import { FileUploadArea } from './FileUploadArea'
import { TecnologiaPicker } from './TecnologiaPicker'
import { useCreateProduccion, useProduccionDetail, useUpdateProduccion } from './useProduccionQueries'

interface ProduccionFormValues {
  titulo: string
  autor: string
  coautores: string
  resumen: string
  anio: string
  estado: EstadoProduccion | ''
  tipo: string
  categoria: string
  tipoInvestigacion: string
  area: string
  carrera: string
  linea: string
}

const EMPTY_VALUES: ProduccionFormValues = {
  titulo: '',
  autor: '',
  coautores: '',
  resumen: '',
  anio: '',
  estado: '',
  tipo: '',
  categoria: '',
  tipoInvestigacion: '',
  area: '',
  carrera: '',
  linea: '',
}

const ESTADOS: EstadoProduccion[] = ['Publicado', 'En revisión', 'Borrador']

type FormErrors = Partial<Record<keyof ProduccionFormValues | 'tecnologias', string>>

function validate(values: ProduccionFormValues, tecnologias: string[]): FormErrors {
  const errors: FormErrors = {}
  const titulo = values.titulo.trim()
  if (titulo.length < 10 || titulo.length > 200) {
    errors.titulo = 'El título debe tener entre 10 y 200 caracteres.'
  }
  if (!values.autor.trim()) errors.autor = 'El autor es obligatorio.'
  if (values.resumen.trim().length < 50) errors.resumen = 'El resumen debe tener al menos 50 caracteres.'
  const anio = Number(values.anio)
  if (!values.anio || Number.isNaN(anio) || anio < 2000 || anio > 2026) {
    errors.anio = 'Ingrese un año válido (2000-2026).'
  }
  if (!values.estado) errors.estado = 'Seleccione un estado.'
  if (!values.tipo) errors.tipo = 'Seleccione un tipo.'
  if (!values.categoria) errors.categoria = 'Seleccione una categoría.'
  if (!values.tipoInvestigacion) errors.tipoInvestigacion = 'Seleccione un tipo de investigación.'
  if (!values.area) errors.area = 'Seleccione un área.'
  if (!values.carrera) errors.carrera = 'Seleccione una carrera.'
  if (!values.linea) errors.linea = 'Seleccione una línea.'
  if (tecnologias.length === 0) errors.tecnologias = 'Seleccione al menos una tecnología.'
  return errors
}

interface ProduccionFormProps {
  mode: 'create' | 'edit'
}

export function ProduccionForm({ mode }: ProduccionFormProps) {
  const params = useParams<{ id: string }>()
  const id = mode === 'edit' ? Number(params.id) : undefined
  const navigate = useNavigate()
  const { showToast } = useToast()

  const detailQuery = useProduccionDetail(id ?? Number.NaN)
  const createMutation = useCreateProduccion()
  const updateMutation = useUpdateProduccion()

  const { data: tipos = [] } = useCatalogList('tipos')
  const { data: categorias = [] } = useCatalogList('categorias')
  const { data: tiposInvestigacion = [] } = useCatalogList('tipos-investigacion')
  const { data: areas = [] } = useCatalogList('areas')
  const { data: carreras = [] } = useCatalogList('carreras')
  const { data: lineas = [] } = useCatalogList('lineas')

  const [values, setValues] = useState<ProduccionFormValues>(EMPTY_VALUES)
  const [tecnologias, setTecnologias] = useState<string[]>([])
  const [documentoFile, setDocumentoFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [prefilled, setPrefilled] = useState(mode === 'create')

  useEffect(() => {
    if (mode === 'edit' && detailQuery.data && !prefilled) {
      const p = detailQuery.data
      setValues({
        titulo: p.titulo,
        autor: p.autor,
        coautores: p.coautores,
        resumen: p.resumen,
        anio: String(p.anio),
        estado: p.estado,
        tipo: p.tipo,
        categoria: p.categoria,
        tipoInvestigacion: p.tipoInvestigacion,
        area: p.area,
        carrera: p.carrera,
        linea: p.linea,
      })
      setTecnologias(p.tecnologias)
      setPrefilled(true)
    }
  }, [mode, detailQuery.data, prefilled])

  function updateField<K extends keyof ProduccionFormValues>(field: K, value: ProduccionFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function toggleTecnologia(nombre: string) {
    setTecnologias((current) => (current.includes(nombre) ? current.filter((t) => t !== nombre) : [...current, nombre]))
  }

  const errors = validate(values, tecnologias)
  const isSaving = createMutation.isPending || updateMutation.isPending

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return

    const payload: ProduccionInput = {
      titulo: values.titulo.trim(),
      autor: values.autor.trim(),
      coautores: values.coautores.trim(),
      resumen: values.resumen.trim(),
      anio: Number(values.anio),
      estado: values.estado as EstadoProduccion,
      tipo: values.tipo,
      categoria: values.categoria,
      tipoInvestigacion: values.tipoInvestigacion,
      area: values.area,
      carrera: values.carrera,
      linea: values.linea,
      tecnologias,
      documento: documentoFile
        ? `documento_${Date.now()}.pdf`
        : (detailQuery.data?.documento ?? `documento_${Date.now()}.pdf`),
      fecha: new Date().toISOString().split('T')[0],
    }

    if (mode === 'edit' && id !== undefined) {
      updateMutation.mutate(
        { id, input: payload },
        {
          onSuccess: () => {
            showToast('Producción académica actualizada correctamente.')
            navigate(paths.produccionList)
          },
        },
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          showToast('Producción académica registrada correctamente.')
          navigate(paths.produccionList)
        },
      })
    }
  }

  if (mode === 'edit' && !prefilled) {
    return <p className="text-muted">Cargando...</p>
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <Form noValidate className="form-custom" onSubmit={handleSubmit}>
          <div className="detail-section">
            <h6>
              <i className="bi bi-file-text me-2" />
              Información General
            </h6>
            <div className="row g-3">
              <div className="col-12">
                <Form.Group controlId="prodTitulo">
                  <Form.Label>Título de la Producción Académica *</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.titulo}
                    onChange={(e) => updateField('titulo', e.target.value)}
                    isInvalid={submitted && !!errors.titulo}
                  />
                  <Form.Control.Feedback type="invalid">{errors.titulo}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="prodAutor">
                  <Form.Label>Autor Principal *</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.autor}
                    onChange={(e) => updateField('autor', e.target.value)}
                    isInvalid={submitted && !!errors.autor}
                  />
                  <Form.Control.Feedback type="invalid">{errors.autor}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="prodCoautores">
                  <Form.Label>Coautores</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Separados por coma"
                    value={values.coautores}
                    onChange={(e) => updateField('coautores', e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="prodResumen">
                  <Form.Label>Resumen *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={values.resumen}
                    onChange={(e) => updateField('resumen', e.target.value)}
                    isInvalid={submitted && !!errors.resumen}
                  />
                  <Form.Control.Feedback type="invalid">{errors.resumen}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-12">
                    <Form.Group controlId="prodAnio">
                      <Form.Label>Año de Publicación *</Form.Label>
                      <Form.Control
                        type="number"
                        min={2000}
                        max={2026}
                        value={values.anio}
                        onChange={(e) => updateField('anio', e.target.value)}
                        isInvalid={submitted && !!errors.anio}
                      />
                      <Form.Control.Feedback type="invalid">{errors.anio}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group controlId="prodEstado">
                      <Form.Label>Estado *</Form.Label>
                      <Form.Select
                        value={values.estado}
                        onChange={(e) => updateField('estado', e.target.value as EstadoProduccion)}
                        isInvalid={submitted && !!errors.estado}
                      >
                        <option value="">Seleccione...</option>
                        {ESTADOS.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.estado}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h6>
              <i className="bi bi-tags me-2" />
              Clasificación
            </h6>
            <div className="row g-3">
              {(
                [
                  ['tipo', 'Tipo de Producción', tipos],
                  ['categoria', 'Categoría', categorias],
                  ['tipoInvestigacion', 'Tipo de Investigación', tiposInvestigacion],
                  ['area', 'Área de Conocimiento', areas],
                  ['carrera', 'Carrera', carreras],
                  ['linea', 'Línea de Investigación', lineas],
                ] as const
              ).map(([field, label, options]) => (
                <div className="col-md-4" key={field}>
                  <Form.Group controlId={`prod-${field}`}>
                    <Form.Label>{label} *</Form.Label>
                    <Form.Select
                      value={values[field]}
                      onChange={(e) => updateField(field, e.target.value)}
                      isInvalid={submitted && !!errors[field]}
                    >
                      <option value="">Seleccione...</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.nombre}>
                          {option.nombre}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
                  </Form.Group>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h6>
              <i className="bi bi-cpu me-2" />
              Tecnologías
            </h6>
            <div className="row g-3">
              <div className="col-12">
                <Form.Label>Tecnologías Utilizadas *</Form.Label>
                <TecnologiaPicker
                  selected={tecnologias}
                  onToggle={toggleTecnologia}
                  isInvalid={submitted && !!errors.tecnologias}
                />
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h6>
              <i className="bi bi-file-earmark-pdf me-2" />
              Documento PDF
            </h6>
            <FileUploadArea currentDocumentLabel={detailQuery.data?.documento} onFileSelected={setDocumentoFile} />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link to={paths.produccionList} className="btn btn-outline-secondary">
              Cancelar
            </Link>
            <Button type="submit" className="btn-primary-custom" disabled={isSaving}>
              <i className="bi bi-check-lg me-1" />
              {isSaving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
