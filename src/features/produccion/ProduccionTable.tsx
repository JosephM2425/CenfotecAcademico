import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { TablePagination } from '../../components/TablePagination'
import { StatusBadge } from '../../components/StatusBadge'
import { useRole } from '../../hooks/useRole'
import { useToast } from '../../hooks/useToast'
import { paths } from '../../routes/paths'
import type { EstadoProduccion, Produccion } from '../../services/types'
import { useDeleteProduccion, useProduccionList } from './useProduccionQueries'

const PAGE_SIZE = 5
const ESTADOS: EstadoProduccion[] = ['Publicado', 'En revisión', 'Borrador']

const columnHelper = createColumnHelper<Produccion>()

export function ProduccionTable() {
  const { data: produccion = [], isLoading } = useProduccionList()
  const { canCreate, canEdit, canDelete } = useRole()
  const deleteMutation = useDeleteProduccion()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [areaFilter, setAreaFilter] = useState('')

  const tipos = useMemo(() => [...new Set(produccion.map((p) => p.tipo))], [produccion])
  const areas = useMemo(() => [...new Set(produccion.map((p) => p.area))], [produccion])

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return produccion.filter((p) => {
      const matchSearch = !term || p.titulo.toLowerCase().includes(term) || p.autor.toLowerCase().includes(term)
      const matchTipo = !tipoFilter || p.tipo === tipoFilter
      const matchEstado = !estadoFilter || p.estado === estadoFilter
      const matchArea = !areaFilter || p.area === areaFilter
      return matchSearch && matchTipo && matchEstado && matchArea
    })
  }, [produccion, search, tipoFilter, estadoFilter, areaFilter])

  const handleDelete = useCallback(
    (id: number) => {
      if (!window.confirm('¿Está seguro de eliminar esta producción académica?')) return
      deleteMutation.mutate(id, {
        onSuccess: () => showToast('Producción académica eliminada correctamente.'),
      })
    },
    [deleteMutation, showToast],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: 'ID' }),
      columnHelper.accessor('titulo', {
        header: 'Título',
        cell: (info) => (
          <span
            className="fw-semibold d-inline-block text-truncate"
            style={{ maxWidth: 250 }}
            title={info.getValue()}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('autor', { header: 'Autor' }),
      columnHelper.accessor('tipo', {
        header: 'Tipo',
        cell: (info) => <span className="badge bg-light text-dark">{info.getValue()}</span>,
      }),
      columnHelper.accessor('area', { header: 'Área' }),
      columnHelper.accessor('anio', { header: 'Año' }),
      columnHelper.accessor('estado', {
        header: 'Estado',
        cell: (info) => <StatusBadge status={info.getValue()} />,
      }),
      columnHelper.display({
        id: 'acciones',
        header: 'Acciones',
        cell: (info) => {
          const row = info.row.original
          return (
            <>
              <Link
                to={paths.produccionDetalle(row.id)}
                className="btn btn-sm btn-outline-primary me-1"
                title="Ver detalle"
              >
                <i className="bi bi-eye" />
              </Link>
              {canEdit && (
                <Link
                  to={paths.produccionEditar(row.id)}
                  className="btn btn-sm btn-outline-warning me-1"
                  title="Editar"
                >
                  <i className="bi bi-pencil" />
                </Link>
              )}
              {canDelete && (
                <Button
                  size="sm"
                  variant="outline-danger"
                  title="Eliminar"
                  onClick={() => handleDelete(row.id)}
                >
                  <i className="bi bi-trash" />
                </Button>
              )}
            </>
          )
        },
      }),
    ],
    [canEdit, canDelete, handleDelete],
  )

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: PAGE_SIZE } },
  })

  // `table` itself is intentionally excluded: it's a new object every render,
  // and including it here would reset the page on every pagination click too.
  useEffect(() => {
    table.setPageIndex(0)
  }, [search, tipoFilter, estadoFilter, areaFilter])

  if (isLoading) return <p className="text-muted">Cargando producción académica...</p>

  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = filtered.length
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const endRow = Math.min(startRow + pageSize - 1, totalRows)

  return (
    <>
      <Card className="card-custom mb-4">
        <Card.Body>
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="search-box">
                <i className="bi bi-search" />
                <Form.Control
                  type="text"
                  placeholder="Buscar por título, autor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <Form.Select size="sm" value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
                <option value="">Todos los tipos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Form.Select size="sm" value={estadoFilter} onChange={(e) => setEstadoFilter(e.target.value)}>
                <option value="">Todos los estados</option>
                {ESTADOS.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Form.Select size="sm" value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
                <option value="">Todas las áreas</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </Form.Select>
            </div>
            {canCreate && (
              <div className="col-md-2 text-end">
                <Link to={paths.produccionNuevo} className="btn btn-primary-custom">
                  <i className="bi bi-plus-lg me-1" />
                  Nuevo
                </Link>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <Card className="card-custom">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="table-custom mb-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center text-muted py-4">
                      No se encontraron resultados
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0 d-flex justify-content-between align-items-center p-3">
          <small className="text-muted">
            {totalRows === 0 ? 'Sin resultados' : `Mostrando ${startRow}-${endRow} de ${totalRows} registros`}
          </small>
          <TablePagination table={table} />
        </Card.Footer>
      </Card>
    </>
  )
}
