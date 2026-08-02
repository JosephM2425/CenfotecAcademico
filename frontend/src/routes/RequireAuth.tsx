import { useAuth } from '@clerk/react'
import { Navigate, Outlet } from 'react-router-dom'
import { paths } from './paths'

export function RequireAuth() {
  const { isLoaded, isSignedIn } = useAuth()
  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to={paths.login} replace />
  return <Outlet />
}
