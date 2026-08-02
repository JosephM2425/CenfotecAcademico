import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useToast } from '../hooks/useToast'

const DARK_TEXT_VARIANTS = new Set(['success', 'danger'])

export function AppToastContainer() {
  const { toasts, dismissToast } = useToast()

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} bg={toast.variant} onClose={() => dismissToast(toast.id)} show>
          <Toast.Body className={DARK_TEXT_VARIANTS.has(toast.variant) ? 'text-white' : undefined}>
            {toast.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}
