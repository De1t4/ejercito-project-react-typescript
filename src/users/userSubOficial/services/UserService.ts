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
      throw new Error("Error finishing users")
    }
    const data: ProfileProps = await res.json()
    return data
  } catch (err) {
    console.error("Error finishing users", err)
  }
}