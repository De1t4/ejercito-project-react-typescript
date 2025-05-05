import { ResponseError } from "@/models/authModels"
import { ProfileProps } from "@/users/userSoldier/models/Profile"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getUserProfile = async (token: string, id: number) => {
  try {
    const res = await fetch(`${API_URL}/v1/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      const data:ResponseError = await res.json()
      if(data.httpStatus === "NOT_FOUND"){
        return data.httpStatus;
      }
      if(data.httpStatus === "BAD_REQUEST"){
        return data.httpStatus
      }
      throw new Error("Error fetching data users")
    }
    const data: ProfileProps = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching data users", err)
  }
}