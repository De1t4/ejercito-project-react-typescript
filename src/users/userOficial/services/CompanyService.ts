import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { Company } from "../../../models/Company.models"


const API_URL = import.meta.env.VITE_BACK_END_URL


export const getCompaniesList = async (token: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/companies?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching companies")
    }
    const data: Pagination<Company> = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching companies", err)
  }
}
