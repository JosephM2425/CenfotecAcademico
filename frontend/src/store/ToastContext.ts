import { createContext } from 'react'

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info'

export interface ToastMessage {
  id: number
  message: string
  variant: ToastVariant
}

export interface ToastContextValue {
  toasts: ToastMessage[]
  showToast: (message: string, variant?: ToastVariant) => void
  dismissToast: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)
