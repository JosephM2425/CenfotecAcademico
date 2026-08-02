import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it.each([
    ['Publicado', 'bg-success'],
    ['En revisión', 'bg-warning'],
    ['Borrador', 'bg-secondary'],
    ['Rechazado', 'bg-danger'],
  ] as const)('renders %s with the %s color', (status, colorClass) => {
    render(<StatusBadge status={status} />)
    expect(screen.getByText(status)).toHaveClass(colorClass)
  })
})
