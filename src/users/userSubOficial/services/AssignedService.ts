import { urlParams } from "@/utils/utils"
import { Pagination } from "../models/Pagination.models"
import { AssignedServices, FormService } from "../models/Services.models"
import toast from "react-hot-toast"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getListAssignedServices = async (token: string, search: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/services/assignments?${urlParams(search.trim(), page, size)}`, {
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
    const res = await fetch(`${API_URL}/v1/services/created/assignments`, {
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
    const res = await fetch(`${API_URL}/v1/services/${payload.id_service}/assignments`, {
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
    const res = await fetch(`${API_URL}/v1/services/${Number(id_services_soldiers)}/assignments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      toast.error("An error occurred. Please try again.")
      throw new Error("Error update assigned services")
    }
    toast.success("Service updated successfully.")
    return "SUCCESS"
  } catch (err) {
    console.error("Error update assigned services", err)
  }
}

export const deleteAssignedService = async (token: string, payload: number[]) => {
  try {
    const res = await fetch(`${API_URL}/v1/services/deleted/assignments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error delete assigned services")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error delete assigned services", err)
  }
}