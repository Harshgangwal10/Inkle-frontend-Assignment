import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import { getCountries } from "../api/countries"

export default function CountryFilter({ column }) {
  const [open, setOpen] = useState(false)
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const selected = column.getFilterValue() ?? []

  useEffect(() => {
    if (!open) return

    setLoading(true)
    setError(null)

    getCountries()
      .then(setCountries)
      .catch(() => setError("Failed to load countries"))
      .finally(() => setLoading(false))
  }, [open])

  const toggle = (value) => {
    if (selected.includes(value)) {
      column.setFilterValue(selected.filter((v) => v !== value))
    } else {
      column.setFilterValue([...selected, value])
    }
  }

  return (
    <div className="relative flex items-center justify-between w-full">
      <span>Country</span>

      <button
        onClick={() => setOpen((v) => !v)}
        className="text-purple-600 hover:text-purple-800"
      >
        <Filter className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-8 right-0 bg-white border rounded-lg shadow-lg w-44 p-2 z-30">
          {loading && (
            <p className="text-sm text-gray-500 text-center">
              Loading...
            </p>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {!loading && !error && countries.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No countries found
            </p>
          )}

          {!loading && !error && countries.length > 0 && (
            <div className="max-h-24 overflow-y-auto">
              {countries.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 text-sm py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(c.name)}
                    onChange={() => toggle(c.name)}
                  />
                  {c.name}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
