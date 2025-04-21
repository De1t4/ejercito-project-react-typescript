const API_URL = import.meta.env.VITE_BACK_END_URL


export const handleFinishService = async (id: number[], token: string) => {
  try {
    const res = await fetch(`${API_URL}/v1/admin/services/finish/assignments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ "id_services_soldiers": id })
    })
    if (!res.ok) {
      throw new Error("Error finishing service")
    }
    const data = await res.json()
    console.log(data)

  } catch (err) {
    console.error("Error finishing service", err)
  }
}