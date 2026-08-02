import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { categoriasSeed } from '../../services/seedData'
import type { AuthUser } from '../../services/types'
import { ToastProvider } from '../../store/ToastProvider'
import { UsuarioContext } from '../../store/UsuarioContext'
import { CatalogMaintenance } from './CatalogMaintenance'

const adminUser: AuthUser = {
  id: 1,
  nombre: 'Admin de Prueba',
  email: 'admin@ucenfotec.ac.cr',
  rol: 'Administrador',
  estado: 'Activo',
  fechaRegistro: '2024-01-01',
}

function renderWithProviders(ui: ReactNode) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <UsuarioContext.Provider value={{ usuario: adminUser, isLoaded: true }}>
        <ToastProvider>{ui}</ToastProvider>
      </UsuarioContext.Provider>
    </QueryClientProvider>,
  )
}

describe('CatalogMaintenance', () => {
  it('lists seeded items and filters by search', async () => {
    renderWithProviders(<CatalogMaintenance catalogKey="categorias" />)

    expect(await screen.findByText(categoriasSeed[0].nombre)).toBeInTheDocument()

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/buscar categoría/i), 'zzz-no-existe')

    await waitFor(() => expect(screen.getByText(/no se encontraron resultados/i)).toBeInTheDocument())
  })

  it('creates a new item through the add modal', async () => {
    renderWithProviders(<CatalogMaintenance catalogKey="categorias" />)
    await screen.findByText(categoriasSeed[0].nombre)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /nueva categoría/i }))

    await user.type(screen.getByLabelText(/nombre/i), 'Categoría de prueba')
    await user.type(screen.getByLabelText(/descripción/i), 'Descripción de prueba')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    await waitFor(() => expect(screen.getByText('Categoría de prueba')).toBeInTheDocument())
  })
})
