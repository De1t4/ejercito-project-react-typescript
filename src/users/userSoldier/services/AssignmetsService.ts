import { Service } from "@/users/userSubOficial/models/Services.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const handleFinishService = async (id: number[], token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/services/finish/assignments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ "id_services_soldiers": id })
    })
    if (!res.ok) {
      throw new Error("Error finishing service")
    }
  } catch (err) {
    console.error("Error finishing service", err)
  }
}

export const getServices = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error finishing services")
    }
    const data: Service[] = await res.json()
    return data;
  } catch (err) {
    console.error("Error finishing services", err)
  }
}