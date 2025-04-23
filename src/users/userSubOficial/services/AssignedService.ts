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


export const updateAssignedServiceSoldier = async (token: string, id_services_soldiers: number, payload: {
  description: string | undefined;
  id_service?: undefined;
} | {
  id_service: string | number;
  description?: undefined;
}) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/services/${Number(id_services_soldiers)}/assignments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      alert("Error update service")
      throw new Error("Error update assigned services")
    }
    return "SUCCESS"

  } catch (err) {
    console.error("Error update assigned services", err)
  }
}