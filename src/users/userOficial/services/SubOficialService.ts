import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { FormEditSubOfficial, FormSubOficial, SubOficial } from "../models/SubOficial.models"
import { ResponseError } from "@/models/authModels"
import { urlParams } from "@/utils/utils"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getSubOfficialsList = async (token: string, search: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/sub-official?${urlParams(search.trim(), page, size).toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching sub officials")
    }
    const data: Pagination<SubOficial> = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching sub officials", err)
  }
}

export const createSubOficial = async (token: string, payload: FormSubOficial) => {
  try {
    const res = await fetch(`${API_URL}/v1/sub-official`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const errorResponse: ResponseError = await res.json()
      if (errorResponse.httpStatus === "BAD_REQUEST") {
        return errorResponse.httpStatus;
      }
      throw new Error("Error update sub official")
    }
    const data: SubOficial = await res.json()
    return data
  } catch (err) {
    console.error("Error create sub-official", err)
  }
}

export const deleteSubOficial = async (token: string, payload: number[]) => {
  try {
    const res = await fetch(`${API_URL}/v1/sub-official/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error delete sub-official")
    }

  } catch (err) {
    console.error("Error delete sub-official", err)
  }
}


export const updateSubOficial = async (token: string, payload: FormEditSubOfficial) => {
  try {
    const res = await fetch(`${API_URL}/v1/sub-official`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const data: ResponseError = await res.json()
      if (data.httpStatus === "BAD_REQUEST") {
        return data.httpStatus;
      }
      throw new Error("Error edit sub-official")
    }
    alert("Sub oficial edit success")
  } catch (err) {
    console.error("Error edit sub-official", err)
  }
}