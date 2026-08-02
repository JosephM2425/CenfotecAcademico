import { useCallback, useRef, useState } from 'react'
import { ConfirmModal } from '../components/ConfirmModal'

interface ConfirmOptions {
  title?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
}

interface ConfirmState extends ConfirmOptions {
  message: string
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null)
  const resolveRef = useRef<(value: boolean) => void>(null)

  const confirm = useCallback((message: string, options?: ConfirmOptions) => {
    setState({ message, ...options })
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
    })
  }, [])

  function settle(result: boolean) {
    setState(null)
    resolveRef.current?.(result)
  }

  const confirmDialog = (
    <ConfirmModal
      show={state !== null}
      message={state?.message ?? ''}
      title={state?.title}
      confirmLabel={state?.confirmLabel}
      cancelLabel={state?.cancelLabel}
      variant={state?.variant}
      onConfirm={() => settle(true)}
      onCancel={() => settle(false)}
    />
  )

  return { confirm, confirmDialog }
}
