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
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { TablePagination } from '../../components/TablePagination'
import { useRole } from '../../hooks/useRole'
import { useToast } from '../../hooks/useToast'
import type { CatalogItem } from '../../services/types'
import { getCatalogConfig } from './catalogConfig'
import { useCatalogList, useCreateCatalogItem, useDeleteCatalogItem, useUpdateCatalogItem } from './useCatalogQueries'

const PAGE_SIZE = 5
const columnHelper = createColumnHelper<CatalogItem>()

interface ItemFormValues {
  nombre: string
  descripcion: string
}

const EMPTY_ITEM: ItemFormValues = { nombre: '', descripcion: '' }

interface CatalogMaintenanceProps {
  catalogKey: string
}

export function CatalogMaintenance({ catalogKey }: CatalogMaintenanceProps) {
  const config = getCatalogConfig(catalogKey)
  const { data: items = [], isLoading } = useCatalogList(catalogKey)
  const createMutation = useCreateCatalogItem(catalogKey)
  const updateMutation = useUpdateCatalogItem(catalogKey)
  const deleteMutation = useDeleteCatalogItem(catalogKey)
  const { canDelete } = useRole()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null)
  const [formValues, setFormValues] = useState<ItemFormValues>(EMPTY_ITEM)

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return items.filter(
      (item) => !term || item.nombre.toLowerCase().includes(term) || item.descripcion.toLowerCase().includes(term),
    )
  }, [items, search])

  const handleDelete = useCallback(
    (id: number) => {
      if (!window.confirm('¿Está seguro de eliminar este registro?')) return
      deleteMutation.mutate(id, { onSuccess: () => showToast('Registro eliminado correctamente.') })
    },
    [deleteMutation, showToast],
  )

  function openAddModal() {
    setFormValues(EMPTY_ITEM)
    setShowAddModal(true)
  }

  function openEditModal(item: CatalogItem) {
    setFormValues({ nombre: item.nombre, descripcion: item.descripcion })
    setEditingItem(item)
  }

  function handleCreate() {
    if (!formValues.nombre.trim() || !formValues.descripcion.trim()) {
      showToast('Complete todos los campos.', 'danger')
      return
    }
    createMutation.mutate(
      { nombre: formValues.nombre.trim(), descripcion: formValues.descripcion.trim() },
      {
        onSuccess: () => {
          setShowAddModal(false)
          showToast('Registro creado correctamente.')
        },
      },
    )
  }

  function handleUpdate() {
    if (!editingItem) return
    if (!formValues.nombre.trim() || !formValues.descripcion.trim()) {
      showToast('Complete todos los campos.', 'danger')
      return
    }
    updateMutation.mutate(
      { id: editingItem.id, input: { nombre: formValues.nombre.trim(), descripcion: formValues.descripcion.trim() } },
      {
        onSuccess: () => {
          setEditingItem(null)
          showToast('Registro actualizado correctamente.')
        },
      },
    )
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: 'ID' }),
      columnHelper.accessor('nombre', {
        header: 'Nombre',
        cell: (info) => <span className="fw-semibold">{info.getValue()}</span>,
      }),
      columnHelper.accessor('descripcion', { header: 'Descripción' }),
      columnHelper.display({
        id: 'acciones',
        header: 'Acciones',
        cell: (info) => {
          const row = info.row.original
          return (
            <>
              <Button
                size="sm"
                variant="outline-primary"
                className="me-1"
                title="Editar"
                onClick={() => openEditModal(row)}
              >
                <i className="bi bi-pencil" />
              </Button>
              {canDelete && (
                <Button size="sm" variant="outline-danger" title="Eliminar" onClick={() => handleDelete(row.id)}>
                  <i className="bi bi-trash" />
                </Button>
              )}
            </>
          )
        },
      }),
    ],
    [canDelete, handleDelete],
  )

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: PAGE_SIZE } },
  })

  // `table` intentionally excluded from deps: see ProduccionTable for rationale.
  useEffect(() => {
    table.setPageIndex(0)
  }, [search])

  if (isLoading) return <p className="text-muted">Cargando...</p>

  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = filtered.length
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const endRow = Math.min(startRow + pageSize - 1, totalRows)

  return (
    <>
      <Card className="card-custom mb-4">
        <Card.Body>
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div className="search-box">
                <i className="bi bi-search" />
                <Form.Control
                  type="text"
                  placeholder={`Buscar ${config.searchNoun}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 text-end">
              <Button className="btn-primary-custom" onClick={openAddModal}>
                <i className="bi bi-plus-lg me-1" />
                {config.addButtonLabel}
              </Button>
            </div>
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

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} dialogClassName="modal-custom">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{config.addModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemFields values={formValues} onChange={setFormValues} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button className="btn-primary-custom" onClick={handleCreate}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editingItem !== null} onHide={() => setEditingItem(null)} dialogClassName="modal-custom">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{config.editModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemFields values={formValues} onChange={setFormValues} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingItem(null)}>
            Cancelar
          </Button>
          <Button className="btn-primary-custom" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

interface ItemFieldsProps {
  values: ItemFormValues
  onChange: (values: ItemFormValues) => void
}

function ItemFields({ values, onChange }: ItemFieldsProps) {
  return (
    <Form className="form-custom">
      <Form.Group className="mb-3" controlId="catalogNombre">
        <Form.Label>Nombre *</Form.Label>
        <Form.Control type="text" value={values.nombre} onChange={(e) => onChange({ ...values, nombre: e.target.value })} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="catalogDescripcion">
        <Form.Label>Descripción *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={values.descripcion}
          onChange={(e) => onChange({ ...values, descripcion: e.target.value })}
        />
      </Form.Group>
    </Form>
  )
}
