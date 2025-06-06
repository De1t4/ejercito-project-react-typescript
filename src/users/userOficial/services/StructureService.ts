import { VITE_BACK_END_URL } from "@/config/config-env";
import { Structure } from "@/models/Structure.models";

const API_URL = VITE_BACK_END_URL

export const fetchDataStructures = async (token: string, idStructure: string): Promise<Structure> => {
  const res = await fetch(`${API_URL}/v1/structure/${idStructure}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  const data: Structure = await res.json()
  return data;
}


export const deleteStructure = async (token: string, idStructure: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/structure/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_structure: [idStructure] })
    })
    if (!res.ok) return
    return "SUCCESS"

    // toast.success("Structure was deleted")
    // redirect("/home")
  } catch (err) {
    console.error("error:", err)
  }
}

export const updateStructure = async (token: string, payload: Partial<Structure>) => {

  try {
    const res = await fetch(`${API_URL}/v1/structure`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) return
    const data = await res.json()
    return data as Structure
  } catch (error) {
    console.error(error)
  }

}

export const fetchStructure = async (token: string): Promise<Structure[]> => {
  const res = await fetch(`${API_URL}/v1/structure`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  return data as Structure[];
}