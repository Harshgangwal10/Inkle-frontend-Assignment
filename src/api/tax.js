import axios from "axios"

const BASE_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/taxes"

export const getTaxes = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (error) {
    console.error("Failed to fetch taxes", error)
    throw error
  }
}

export const updateTax = async (id, payload) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, payload)
    return res.data
  } catch (error) {
    console.error(`Failed to update tax with id ${id}`, error)
    throw error
  }
}
