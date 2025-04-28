import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { SubOficial } from "../models/SubOficial.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getSubOfficialsList = async (token: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/sub-official?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching sub officials")
    }
    const data: Pagination<SubOficial> = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching sub officials", err)
  }
}
