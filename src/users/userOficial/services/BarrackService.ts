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

export const createBarrack = async (token: string, payload:Barrack) => {
  try {
    const res = await fetch(`${API_URL}/v1/barracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error create Barrack")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error create Barrack", err)
  }
}

export const updateBarrack = async (token: string, payload:Barrack) => {
  try {
    const res = await fetch(`${API_URL}/v1/barracks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error edit Barrack")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error edit Barrack", err)
  }
}

export const deleteBarrack = async (token: string, payload:number[]) => {
  try {
    const res = await fetch(`${API_URL}/v1/barracks/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error deleted Barrack")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error deleted Barrack", err)
  }
}