import { ResponseError } from "@/models/authModels"
import { FormSoldier, Soldier } from "../models/Soldier.models"

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
    const payload = { ...soldierData, soldier: { name: soldierData.name, lastname: soldierData.lastname, graduation: soldierData.graduation, id_company: soldierData.id_company, id_barrack: soldierData.id_barrack, id_body: soldierData.id_body } }
    const res = await fetch(`${API_URL}/v1/soldiers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errorResponse: ResponseError = await res.json();
      if (errorResponse.httpStatus === "BAD_REQUEST") {
        alert("The user " + soldierData.username + "has already been registered")
        throw ("The user " + soldierData.username + "has already been registered")
      }
      throw new Error("Error create soldier")
    }
    return "success"
  } catch (err) {
    console.error("Error create soldier", err)
  }
}

export const deleteSoldierById = async (token: string, id: number[]) => {
  try {
    const res = await fetch(`${API_URL}/v1/users/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id)
    })
    if (!res.ok) {
      throw new Error("Error delete soldier")
    }
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
        return data.httpStatus;
      }
      throw new Error("Error edit profile soldier")
    }
    alert("Profile soldier success edit")

    return
  } catch (err) {
    console.error("Error edit profile soldier", err)
  }
}