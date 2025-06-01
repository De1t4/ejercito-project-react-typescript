import { ResponseError } from "@/models/authModels"
import { FormSoldier, Soldier } from "../models/Soldier.models"
import toast from "react-hot-toast"
import { mapSoldier } from "@/utils/mapPayload"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getSoldiers = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/soldiers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching data soldiers")
    }
    const data: Soldier[] = await res.json()
    return data;
  } catch (err) {
    console.error("Error fetching data soldiers", err)
  }
}

export const createSoldier = async (token: string, soldierData: FormSoldier) => {
  try {
    const res = await fetch(`${API_URL}/v1/soldiers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mapSoldier(soldierData))
    })

    if (!res.ok) {
      const errorResponse: ResponseError = await res.json();
      if (errorResponse.httpStatus === "BAD_REQUEST") {
        toast.error(errorResponse.message, { icon: "🚧" })
        throw (errorResponse.message)
      }
      throw new Error("Error create soldier")
    }
    toast.success("Soldier created successfully.")
    return "success"
  } catch (err) {
    console.error("Error create soldier", err)
  }
}

export const deleteSoldierById = async (token: string, id: number[], idStructure: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/soldiers/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_structure: idStructure, id_soldier: id })
    })
    if (!res.ok) {
      const error: ResponseError = await res.json()
      switch (error.httpStatus) {
        case "NOT_FOUND":
          toast.error(error.message)
          throw new Error(error.message)
        default:
          throw new Error("Error delete soldier")
      }
    }
    toast.success(`Soldier with ID ${id} was deleted.`)

  } catch (err) {
    console.error("Error delete soldier", err)
  }
}

export const updateProfileUser = async (token: string, soldierData: FormSoldier) => {
  try {
    const res = await fetch(`${API_URL}/v1/soldiers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(soldierData)
    })
    if (!res.ok) {
      const data: ResponseError = await res.json()
      if (data.httpStatus === "BAD_REQUEST") {
        toast.error("The user " + soldierData.username + " has already been registered", { icon: "🚧" })
        return data.httpStatus;
      }
      throw new Error("Error edit profile soldier")
    }
    toast.success("Soldier updated successfully.")

    return
  } catch (err) {
    console.error("Error edit profile soldier", err)
  }
}