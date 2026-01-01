import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SquarePen } from "lucide-react"
import CountryFilter from "./CountryFilter"

export default function Table({ data, onEdit, loading }) {
  const [columnFilters, setColumnFilters] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 10 

  const columns = [
    {
      header: "Entity",
      accessorKey: "name",
      cell: (info) => (
        <span className="text-purple-600 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "Gender",
      accessorKey: "gender",
      cell: (info) => (
        <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Request date",
      accessorKey: "requestDate",
      cell: (info) => {
        const date = new Date(info.getValue())
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      },
    },
    {
      accessorKey: "country",
      header: ({ column }) => <CountryFilter column={column} />,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue?.length) return true
        return filterValue.includes(row.getValue(columnId))
      },
      cell: (info) => (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
          {info.getValue()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => onEdit(row.original)}
          className="flex justify-center text-purple-600 hover:text-purple-800"
        >
          <SquarePen className="w-4 h-4" />
        </button>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination: { pageIndex, pageSize },
    },
    onColumnFiltersChange: (filters) => {
      setColumnFilters(filters)
      setPageIndex(0) 
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater
      setPageIndex(next.pageIndex)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageRows = table.getRowModel().rows
  const isFiltered = columnFilters.length > 0

  return (
    <div>
      <table className="w-full border border-gray-200 border-collapse">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="p-3 text-left text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {/* Loading */}

          {loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-3 text-sm text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          )}

          {/* if data is not present for selected country then it shows this message  */}

          {!loading && pageRows.length === 0 && isFiltered && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-3 text-sm text-center text-gray-500"
              >
                No data found for selected country
              </td>
            </tr>
          )}

          {/*if api fails it shows this message  */}

          {!loading && pageRows.length === 0 && !isFiltered && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-3 text-sm text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}

          
          {!loading &&
            pageRows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-sm border-r border-gray-200 last:border-r-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="flex items-center justify-center mt-2 gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <span className="text-sm px-2">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}
