import { useAuth } from '@clerk/react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StatusBadge } from '../../components/StatusBadge'
import { useConfirm } from '../../hooks/useConfirm'
import { useRole } from '../../hooks/useRole'
import { useToast } from '../../hooks/useToast'
import { paths } from '../../routes/paths'
import { produccionApi } from '../../services/produccionApi'
import { useDeleteProduccion, useProduccionDetail } from './useProduccionQueries'

export function ProduccionDetail() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const { data: prod, isLoading } = useProduccionDetail(id)
  const { canEdit, canDelete, role } = useRole()
  const deleteMutation = useDeleteProduccion()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const [isDownloading, setIsDownloading] = useState(false)
  const { confirm, confirmDialog } = useConfirm()

  async function handleDelete() {
    const confirmed = await confirm('¿Está seguro de eliminar esta producción académica?', {
      title: 'Eliminar producción académica',
      confirmLabel: 'Eliminar',
    })
    if (!confirmed) return
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showToast('Producción académica eliminada correctamente.')
        navigate(paths.produccionList)
      },
    })
  }

  async function handleDownload() {
    if (!prod?.documento) return
    setIsDownloading(true)
    try {
      await produccionApi.downloadDocumento(getToken, id, prod.documento)
    } catch {
      showToast('No se pudo descargar el documento.', 'danger')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <div className="mb-3">
        <Link to={paths.produccionList} className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1" />
          Volver al listado
        </Link>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-2 text-muted">
          <Spinner animation="border" size="sm" />
          Cargando...
        </div>
      ) : !prod ? (
        <div className="alert alert-warning">Producción no encontrada.</div>
      ) : (
        <>
          <div className="detail-section">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
              <div>
                <h4 className="mb-2" style={{ color: 'var(--primary)' }}>
                  {prod.titulo}
                </h4>
                <div className="d-flex gap-2 flex-wrap">
                  <StatusBadge status={prod.estado} />
                  <span className="badge bg-light text-dark">{prod.tipo}</span>
                  <span className="badge bg-light text-dark">{prod.categoria}</span>
                </div>
              </div>
              {(role === 'Administrador' || role === 'Docente') && (
                <div className="d-flex gap-2">
                  <Link to={paths.produccionList} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-1" />
                    Volver
                  </Link>
                  {canEdit && (
                    <Link to={paths.produccionEditar(prod.id)} className="btn btn-warning">
                      <i className="bi bi-pencil me-1" />
                      Editar
                    </Link>
                  )}
                  {canDelete && (
                    <Button variant="danger" onClick={handleDelete}>
                      <i className="bi bi-trash me-1" />
                      Eliminar
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="detail-section">
                <h6>
                  <i className="bi bi-info-circle me-2" />
                  Información General
                </h6>
                <div className="row g-3">
                  <div className="col-md-6 detail-item">
                    <label>Autor Principal</label>
                    <p>
                      <i className="bi bi-person me-1" />
                      {prod.autor}
                    </p>
                  </div>
                  <div className="col-md-6 detail-item">
                    <label>Coautores</label>
                    <p>{prod.coautores || <span className="text-muted">N/A</span>}</p>
                  </div>
                  <div className="col-12 detail-item">
                    <label>Resumen</label>
                    <p>{prod.resumen}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Año de Publicación</label>
                    <p>{prod.anio}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Fecha de Registro</label>
                    <p>{prod.fecha}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>ID</label>
                    <p>#{prod.id}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h6>
                  <i className="bi bi-tags me-2" />
                  Clasificación
                </h6>
                <div className="row g-3">
                  <div className="col-md-4 detail-item">
                    <label>Tipo de Producción</label>
                    <p>{prod.tipo}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Categoría</label>
                    <p>{prod.categoria}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Tipo de Investigación</label>
                    <p>{prod.tipoInvestigacion}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Área de Conocimiento</label>
                    <p>{prod.area}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Carrera</label>
                    <p>{prod.carrera}</p>
                  </div>
                  <div className="col-md-4 detail-item">
                    <label>Línea de Investigación</label>
                    <p>{prod.linea}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h6>
                  <i className="bi bi-cpu me-2" />
                  Tecnologías
                </h6>
                <div>
                  {prod.tecnologias.map((t) => (
                    <span key={t} className="badge bg-primary me-1 mb-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="detail-section">
                <h6>
                  <i className="bi bi-file-earmark-pdf me-2" />
                  Documento
                </h6>
                <div className="text-center py-3">
                  <i
                    className="bi bi-file-earmark-pdf"
                    style={{ fontSize: '3rem', color: prod.documento ? '#e53e3e' : '#adb5bd' }}
                  />
                  <p className="mt-2 mb-1 fw-semibold">{prod.documento || 'Sin documento'}</p>
                  <small className="text-muted">Documento PDF</small>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="btn-primary-custom"
                      onClick={handleDownload}
                      disabled={!prod.documento || isDownloading}
                    >
                      {isDownloading ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" />
                      ) : (
                        <i className="bi bi-download me-1" />
                      )}
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {confirmDialog}
    </>
  )
}
