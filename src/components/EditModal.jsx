import { useEffect, useState } from "react"
import { getCountries } from "../api/countries"
import { X } from "lucide-react" 

export default function EditModal({ row, onClose, onSave }) {
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (row) {
      setName(row.name)
      setCountry(row.country)
    }
  }, [row])

  useEffect(() => {
    getCountries().then(setCountries)
  }, [])

  if (!row) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-100 p-6 rounded-xl relative">
       
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>

        <label className="text-sm">Name</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm">Country</label>
        <select
          className="w-full border p-2 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {countries.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, country })}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
