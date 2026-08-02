import { useRef, useState } from 'react'

interface FileUploadAreaProps {
  currentDocumentLabel?: string
  onFileSelected: (file: File) => void
}

const MAX_SIZE_BYTES = 10 * 1024 * 1024

export function FileUploadArea({ currentDocumentLabel, onFileSelected }: FileUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  function handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      setLocalError('Solo se permiten archivos PDF.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setLocalError('El archivo excede el tamaño máximo de 10MB.')
      return
    }
    setLocalError(null)
    setSelectedFile(file)
    onFileSelected(file)
  }

  return (
    <>
      <div
        className="file-upload-area"
        style={dragOver ? { borderColor: '#006aea' } : undefined}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0])
        }}
      >
        <i className="bi bi-cloud-arrow-up" />
        <p className="mb-1 fw-semibold">Haga clic o arrastre un archivo PDF aquí</p>
        <small className="text-muted">Tamaño máximo: 10MB</small>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="d-none"
          onChange={(e) => {
            if (e.target.files?.length) handleFile(e.target.files[0])
          }}
        />
      </div>
      <div className="mt-2">
        {localError ? (
          <div className="alert alert-danger alert-custom py-2">{localError}</div>
        ) : selectedFile ? (
          <div className="alert alert-success alert-custom py-2">
            <i className="bi bi-file-earmark-pdf me-2" />
            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        ) : currentDocumentLabel ? (
          <div className="alert alert-info alert-custom py-2">
            <i className="bi bi-file-earmark-pdf me-2" />
            Documento actual: {currentDocumentLabel}
          </div>
        ) : null}
      </div>
    </>
  )
}
