import { urlParams } from "@/utils/utils"
import { DashboardData } from "../models/GeneralData.models"
import { Soldier, Structure } from "../models/Soldier.models"
import { Pagination } from "../models/Pagination.models"

const API_URL = import.meta.env.VITE_BACK_END_URL


export const getSoldierList = async (token: string, search: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/general-data-soldiers?${urlParams(search.trim(), page, size).toString()}`, {
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


export const handleDataGeneral = async (token: string) => {
  // const res = await fetch(`${API_URL}/v1/admin/general-data`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  // if (!res.ok) {
  //   throw new Error("Error finishing service")
  // }
  // const data: DashboardData = await res.json()
  // return data
  return fetch(`${API_URL}/v1/admin/general-data`, { headers: { Authorization: `Bearer ${token}`, } })
    .then((res) => res.json() as Promise<DashboardData>)
    .then((res) => {
      return res
    })
}

export const getStructureMilitary = async (token: string) => {
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



