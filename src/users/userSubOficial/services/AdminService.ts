import { DashboardData } from "../models/GeneralData.models"
import { Structure } from "../models/Soldier.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const handleDataGeneral = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/general-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error finishing service")
    }
    const data: DashboardData = await res.json()
    return data
  } catch (err) {
    console.error("Error finishing service", err)
  }
}

export const getStructureMilitary= async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/general-data-structure`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error finishing structure military")
    }
    const data: Structure = await res.json()
    return data
  } catch (err) {
    console.error("Error finishing structure military", err)
  }
}