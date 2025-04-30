import { ArmyBody } from "@/models/ArmyBody.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getArmyBodiesList = async (token: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/bodies?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching army bodies")
    }
    const data: Pagination<ArmyBody> = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching army bodies", err)
  }
}

export const createBody = async (token: string, payload:Omit<ArmyBody, 'id_body'>) => {
  try {
    const res = await fetch(`${API_URL}/v1/bodies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error create Body")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error create Body", err)
  }
}

export const updateBody = async (token: string, payload:Omit<ArmyBody, 'id_body'>) => {
  try {
    const res = await fetch(`${API_URL}/v1/bodies`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error edit Body")
    }
    const data:ArmyBody = await res.json()
    return data
  } catch (err) {
    console.error("Error edit Body", err)
  }
}

export const deleteBody = async (token: string, payload:number[]) => {
  try {
    const res = await fetch(`${API_URL}/v1/bodies/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error deleted Body")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error deleted Body", err)
  }
}