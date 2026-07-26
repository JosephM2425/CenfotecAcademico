import { Navigate } from 'react-router-dom'
import { LoginForm } from '../features/auth/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { paths } from '../routes/paths'

export function LoginPage() {
  const { user } = useAuth()
  if (user) return <Navigate to={paths.dashboard} replace />

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  )
}
