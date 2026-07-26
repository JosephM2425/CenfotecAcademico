import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/app.css'
import { router } from './routes/router'
import { queryClient } from './store/queryClient'
import { RoleProvider } from './store/RoleProvider'
import { ToastProvider } from './store/ToastProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </RoleProvider>
    </QueryClientProvider>
  </StrictMode>,
)
