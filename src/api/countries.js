import axios from "axios"

const BASE_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/countries"

export const getCountries = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (error) {
    console.error("Failed to fetch countries", error)
    throw error
  }
}
