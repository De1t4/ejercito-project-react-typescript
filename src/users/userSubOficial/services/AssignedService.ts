import { Pagination } from "../models/Pagination.models"
import { AssignedServices } from "../models/Services.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getListAssignedServices = async (token: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/services/assignments?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error finishing assigned services")
    }
    const data: Pagination<AssignedServices> = await res.json()
    return data
  } catch (err) {
    console.error("Error finishing assigned services", err)
  }
}

