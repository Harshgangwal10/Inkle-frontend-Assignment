import { useEffect, useState } from "react"
import Table from "../components/Table"
import EditModal from "../components/EditModal"
import { getTaxes, updateTax } from "../api/tax"

export default function Home() {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getTaxes()
      .then(setData)
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Tax Requests</h1>

      {/* Error state */}

      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}

      {!error && (
        <Table data={data} onEdit={setSelected} loading={loading} />
      )}

      <EditModal
        row={selected}
        onClose={() => setSelected(null)}
        onSave={async (updated) => {
          const res = await updateTax(selected.id, {
            ...selected,
            ...updated,
          })

          setData((prev) =>
            prev.map((i) => (i.id === res.id ? res : i))
          )
          setSelected(null)
        }}
      />
    </div>
  )
}
