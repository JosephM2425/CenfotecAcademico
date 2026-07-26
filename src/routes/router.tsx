import { createBrowserRouter } from 'react-router-dom'
import { getCatalogConfig } from '../features/catalogos/catalogConfig'
import { MainLayout } from '../layouts/MainLayout'
import { CatalogoPage } from '../pages/CatalogoPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProduccionDetallePage } from '../pages/ProduccionDetallePage'
import { ProduccionEditarPage } from '../pages/ProduccionEditarPage'
import { ProduccionListPage } from '../pages/ProduccionListPage'
import { ProduccionNuevoPage } from '../pages/ProduccionNuevoPage'
import { UsuariosPage } from '../pages/UsuariosPage'
import { paths } from './paths'
import { RequireAuth } from './RequireAuth'

export const router = createBrowserRouter([
  { path: paths.login, element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <DashboardPage />, handle: { title: 'Dashboard' } },
          { path: 'produccion', element: <ProduccionListPage />, handle: { title: 'Listar Producción Académica' } },
          {
            path: 'produccion/nuevo',
            element: <ProduccionNuevoPage />,
            handle: { title: 'Registrar Producción Académica' },
          },
          {
            path: 'produccion/:id/editar',
            element: <ProduccionEditarPage />,
            handle: { title: 'Modificar Producción Académica' },
          },
          {
            path: 'produccion/:id',
            element: <ProduccionDetallePage />,
            handle: { title: 'Detalle de Producción Académica' },
          },
          {
            path: 'mantenimientos/usuarios',
            element: <UsuariosPage />,
            handle: { title: 'Mantenimiento de Usuarios' },
          },
          {
            path: 'mantenimientos/:catalogKey',
            element: <CatalogoPage />,
            handle: {
              title: (params: { catalogKey?: string }) => getCatalogConfig(params.catalogKey ?? '').pageTitle,
            },
          },
          { path: '*', element: <NotFoundPage />, handle: { title: 'Página no encontrada' } },
        ],
      },
    ],
  },
])
