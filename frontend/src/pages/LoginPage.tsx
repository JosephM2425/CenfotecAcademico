import { SignIn, useAuth } from '@clerk/react'
import { Navigate } from 'react-router-dom'
import { paths } from '../routes/paths'

export function LoginPage() {
  const { isLoaded, isSignedIn } = useAuth()
  if (isLoaded && isSignedIn) return <Navigate to={paths.dashboard} replace />

  return (
    <div className="login-page">
      <SignIn fallbackRedirectUrl={paths.dashboard} />
    </div>
  )
}
