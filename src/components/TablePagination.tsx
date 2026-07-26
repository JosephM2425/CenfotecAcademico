import Pagination from 'react-bootstrap/Pagination'
import type { Table } from '@tanstack/react-table'

export function TablePagination<T>({ table }: { table: Table<T> }) {
  const pageCount = table.getPageCount()
  if (pageCount <= 1) return null
  const { pageIndex } = table.getState().pagination

  return (
    <Pagination className="pagination-custom mb-0">
      <Pagination.Prev disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} />
      {Array.from({ length: pageCount }, (_, i) => (
        <Pagination.Item key={i} active={i === pageIndex} onClick={() => table.setPageIndex(i)}>
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} />
    </Pagination>
  )
}
