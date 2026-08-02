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
import { useConfirm } from '../../hooks/useConfirm'
import { useRole } from '../../hooks/useRole'
import { useToast } from '../../hooks/useToast'
import type { EstadoUsuario, Rol, Usuario } from '../../services/types'
import { useCreateUsuario, useDeleteUsuario, useUpdateUsuario, useUsuariosList } from './useUsuariosQueries'

const PAGE_SIZE = 5
const ROLES: Rol[] = ['Administrador', 'Docente', 'Estudiante', 'Investigador']
const ESTADOS: EstadoUsuario[] = ['Activo', 'Inactivo']

interface UsuarioFormValues {
  nombre: string
  email: string
  password: string
  rol: Rol | ''
  estado: EstadoUsuario
}

const EMPTY_FORM: UsuarioFormValues = { nombre: '', email: '', password: '', rol: '', estado: 'Activo' }

const columnHelper = createColumnHelper<Usuario>()

export function UsuariosMaintenance() {
  const { data: usuarios = [], isLoading } = useUsuariosList()
  const createMutation = useCreateUsuario()
  const updateMutation = useUpdateUsuario()
  const deleteMutation = useDeleteUsuario()
  const { canDelete } = useRole()
  const { showToast } = useToast()
  const { confirm, confirmDialog } = useConfirm()

  const [search, setSearch] = useState('')
  const [rolFilter, setRolFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [formValues, setFormValues] = useState<UsuarioFormValues>(EMPTY_FORM)

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return usuarios.filter((u) => {
      const matchSearch = !term || u.nombre.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
      const matchRol = !rolFilter || u.rol === rolFilter
      return matchSearch && matchRol
    })
  }, [usuarios, search, rolFilter])

  const handleDelete = useCallback(
    async (id: number) => {
      const confirmed = await confirm('¿Está seguro de eliminar este registro?', {
        title: 'Eliminar usuario',
        confirmLabel: 'Eliminar',
      })
      if (!confirmed) return
      deleteMutation.mutate(id, { onSuccess: () => showToast('Registro eliminado correctamente.') })
    },
    [confirm, deleteMutation, showToast],
  )

  function openAddModal() {
    setFormValues(EMPTY_FORM)
    setShowAddModal(true)
  }

  function openEditModal(usuario: Usuario) {
    setFormValues({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol: usuario.rol,
      estado: usuario.estado,
    })
    setEditingUsuario(usuario)
  }

  function handleCreate() {
    if (!formValues.nombre.trim() || !formValues.email.trim() || !formValues.password || !formValues.rol) {
      showToast('Complete todos los campos obligatorios.', 'danger')
      return
    }
    createMutation.mutate(
      {
        nombre: formValues.nombre.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        rol: formValues.rol,
        estado: formValues.estado,
        fechaRegistro: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          setShowAddModal(false)
          showToast('Usuario creado correctamente.')
        },
      },
    )
  }

  function handleUpdate() {
    if (!editingUsuario) return
    if (!formValues.nombre.trim() || !formValues.email.trim() || !formValues.rol) {
      showToast('Complete todos los campos obligatorios.', 'danger')
      return
    }
    updateMutation.mutate(
      {
        id: editingUsuario.id,
        input: {
          nombre: formValues.nombre.trim(),
          email: formValues.email.trim(),
          rol: formValues.rol,
          estado: formValues.estado,
          ...(formValues.password ? { password: formValues.password } : {}),
        },
      },
      {
        onSuccess: () => {
          setEditingUsuario(null)
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
      columnHelper.accessor('email', { header: 'Email' }),
      columnHelper.accessor('rol', {
        header: 'Rol',
        cell: (info) => <span className="badge bg-light text-dark">{info.getValue()}</span>,
      }),
      columnHelper.accessor('estado', {
        header: 'Estado',
        cell: (info) => (
          <span className={`badge bg-${info.getValue() === 'Activo' ? 'success' : 'secondary'}`}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('fechaRegistro', { header: 'Fecha Registro' }),
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

  useEffect(() => {
    table.setPageIndex(0)
  }, [search, rolFilter])

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
            <div className="col-md-6">
              <div className="search-box">
                <i className="bi bi-search" />
                <Form.Control
                  type="text"
                  placeholder="Buscar usuario..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <Form.Select size="sm" value={rolFilter} onChange={(e) => setRolFilter(e.target.value)}>
                <option value="">Todos los roles</option>
                {ROLES.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-3 text-end">
              <Button className="btn-primary-custom" onClick={openAddModal}>
                <i className="bi bi-plus-lg me-1" />
                Nuevo Usuario
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
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuarioFields values={formValues} onChange={setFormValues} isEditing={false} />
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

      <Modal show={editingUsuario !== null} onHide={() => setEditingUsuario(null)} dialogClassName="modal-custom">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuarioFields values={formValues} onChange={setFormValues} isEditing />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingUsuario(null)}>
            Cancelar
          </Button>
          <Button className="btn-primary-custom" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {confirmDialog}
    </>
  )
}

interface UsuarioFieldsProps {
  values: UsuarioFormValues
  onChange: (values: UsuarioFormValues) => void
  isEditing: boolean
}

function UsuarioFields({ values, onChange, isEditing }: UsuarioFieldsProps) {
  return (
    <Form className="form-custom">
      <Form.Group className="mb-3" controlId="usuarioNombre">
        <Form.Label>Nombre *</Form.Label>
        <Form.Control type="text" value={values.nombre} onChange={(e) => onChange({ ...values, nombre: e.target.value })} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuarioEmail">
        <Form.Label>Email *</Form.Label>
        <Form.Control type="email" value={values.email} onChange={(e) => onChange({ ...values, email: e.target.value })} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuarioPassword">
        <Form.Label>{isEditing ? 'Nueva contraseña (opcional)' : 'Contraseña *'}</Form.Label>
        <Form.Control
          type="password"
          placeholder={isEditing ? 'Dejar en blanco para no cambiarla' : ''}
          value={values.password}
          onChange={(e) => onChange({ ...values, password: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuarioRol">
        <Form.Label>Rol *</Form.Label>
        <Form.Select value={values.rol} onChange={(e) => onChange({ ...values, rol: e.target.value as Rol })}>
          <option value="">Seleccione...</option>
          {ROLES.map((rol) => (
            <option key={rol} value={rol}>
              {rol}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuarioEstado">
        <Form.Label>Estado *</Form.Label>
        <Form.Select
          value={values.estado}
          onChange={(e) => onChange({ ...values, estado: e.target.value as EstadoUsuario })}
        >
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  )
}
