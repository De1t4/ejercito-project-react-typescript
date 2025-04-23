import { Pagination } from "../models/Pagination.models"
import { AssignedServices, FormService } from "../models/Services.models"

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

export const assignedNewServiceSoldier = async (token: string, payload: FormService) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/services/created/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_soldier: payload.id_soldier, description: payload.description })
    })
    if (!res.ok) {
      throw new Error("Error create asigned new services")
    }
    return "SUCCESS"

  } catch (err) {
    console.error("Error create asigned new services", err)
  }
}

export const assignedServiceSoldier = async (token: string, payload: FormService) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/services/${payload.id_service}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_soldiers: payload.id_soldier })
    })
    if (!res.ok) {
      throw new Error("Error assigned services")
    }
    return "SUCCESS"

  } catch (err) {
    console.error("Error assigned services", err)
  }
}