import { ResponseError } from "@/models/authModels"
import { ProfileProps } from "../users/userSoldier/models/Profile"
import { FormValidation } from "@/users/userSoldier/models/Password.models"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const fetchSoldierData = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/profile/find`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      const data: ResponseError = await res.json()
      if (data.httpStatus) return data.httpStatus
      else throw new Error("error fetching soldier data")
    }
    const data: ProfileProps = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching soldier data", err)
  }
}

export const modifyPasswordUser = async (data: FormValidation, token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/profile/update`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        
      },
    })
    if(!res.ok){
      const data = await res.json()
      if (data.httpStatus) return data.httpStatus
      throw new Error("Error update password")
    }
    return "Sucess"
  } catch (err) {
    console.error("Error update password user", err)
  }
}