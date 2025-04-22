import { ResponseError } from "@/models/authModels"
import { FormSoldier, Soldier } from "../models/Soldier.models"
import { Pagination } from "../models/Pagination.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getSoldierList = async (token: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/general-data-soldiers?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error finishing soldiers")
    }
    const data: Pagination<Soldier> = await res.json()
    return data
  } catch (err) {
    console.error("Error finishing soldiers", err)
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
      throw new Error("Error create soldier")
    }
  } catch (err) {
    console.error("Error create soldier", err)
  }
}
