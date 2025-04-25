import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { urlParams } from "@/utils/utils"
import { Company } from "../../../models/Company.models"


const API_URL = import.meta.env.VITE_BACK_END_URL


export const getCompaniesList = async (token: string, search: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/general-data-soldiers?${urlParams(search, page, size)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error finishing soldiers")
    }
    const data: Pagination<Company> = await res.json()
    return data
  } catch (err) {
    console.error("Error finishing soldiers", err)
  }
}
