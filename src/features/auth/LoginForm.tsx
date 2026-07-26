import { useState, type FormEvent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { paths } from '../../routes/paths'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate(paths.dashboard, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-card">
      <div className="text-center mb-4">
        <i className="bi bi-mortarboard-fill" style={{ fontSize: '2.5rem', color: 'var(--primary)' }} />
        <h4 className="mt-2 mb-0" style={{ color: 'var(--primary)' }}>
          CenfoAcadémico
        </h4>
        <small className="text-muted">Producción Académica</small>
      </div>

      <Form className="form-custom" noValidate onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger alert-custom py-2">{error}</div>}

        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Correo institucional</Form.Label>
          <Form.Control
            type="email"
            placeholder="usuario@ucenfotec.ac.cr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button type="submit" className="btn-primary-custom w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <small className="text-muted">Usuario de prueba: admin@ucenfotec.ac.cr / Cenfotec2024!</small>
      </div>
    </div>
  )
}
