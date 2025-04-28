import { Barrack } from "@/models/Barrack.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getBarracksList = async (token: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/barracks?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching barracks")
    }
    const data: Pagination<Barrack> = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching barracks", err)
  }
}
