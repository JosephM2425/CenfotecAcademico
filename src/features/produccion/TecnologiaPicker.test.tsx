import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TecnologiaPicker } from './TecnologiaPicker'

function renderPicker(selected: string[] = []) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const onToggle = vi.fn()
  render(
    <QueryClientProvider client={queryClient}>
      <TecnologiaPicker selected={selected} onToggle={onToggle} />
    </QueryClientProvider>,
  )
  return { onToggle }
}

describe('TecnologiaPicker', () => {
  it('filters the dropdown as you type and selects a match', async () => {
    const { onToggle } = renderPicker()
    const user = userEvent.setup()

    const input = screen.getByPlaceholderText(/buscar tecnología/i)
    await user.click(input)
    await user.type(input, 'Python')

    const option = await screen.findByRole('button', { name: 'Python' })
    await user.click(option)

    expect(onToggle).toHaveBeenCalledWith('Python')
  })

  it('does not show already-selected technologies in the dropdown', async () => {
    renderPicker(['Python'])
    const user = userEvent.setup()
    await user.click(screen.getByPlaceholderText(/buscar tecnología/i))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Java' })).toBeInTheDocument())
    expect(screen.queryByRole('button', { name: 'Python' })).not.toBeInTheDocument()
  })

  it('renders selected technologies as removable chips', async () => {
    const { onToggle } = renderPicker(['Java'])
    expect(screen.getByText('Java')).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /quitar java/i }))
    expect(onToggle).toHaveBeenCalledWith('Java')
  })
})
