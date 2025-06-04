import { VITE_BACK_END_URL } from "@/config/config-env"
import { useGlobalContext } from "@/context/globalContext"
import { Popover, Spin } from "antd"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = VITE_BACK_END_URL

export interface Structure {
  id_structure: string
  name: string
  iduseradmin: number
  description: string
}

export default function SettingsStructure() {
  const [structure, setStructure] = useState<Structure | null>(null)
  const { idStructure } = useParams()
  const { authTokens } = useGlobalContext()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const redirect = useNavigate()
  if (!authTokens) return

  const fetchStructure = async () => {
    try {
      const res = await fetch(`${API_URL}/v1/structure/${idStructure}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.token}`,
        },
      })
      if (!res.ok) return
      const data: Structure = await res.json()
      setStructure(data)
    } catch (err) {
      console.error("error:", err)
    }
  }

  const handleDeleteStructure = async () => {
    try {
      const res = await fetch(`${API_URL}/v1/structure/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify({ id_structure: [idStructure] })
      })
      if (!res.ok) return
      toast.success("Structure was deleted")
      redirect("/home")
    } catch (err) {
      console.error("error:", err)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStructure((prev) => prev ? { ...prev, name: e.target.value } : prev)
  }

  const handleSubmitRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (structure?.name.trim() === "") {
      setError(true); return;
    }
    setError(false)
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/v1/structure`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify({ name: structure?.name, iduseradmin: structure?.iduseradmin, id_structure: structure?.id_structure })
      })
      if (!res.ok) return
      toast.success("Rename name structure successful")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStructure()
  }, [idStructure])

  return (
    <section className="bg-white rounded-lg shadow border-red-400 border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Structure Settings</h2>
      </div>
      <article className="p-6 space-y-6 border-b border-gray-200">

        <form onSubmit={handleSubmitRename}>
          <label className="font-semibold " htmlFor={"name"}>Structure name</label>
          <div className="flex max-md:flex-col gap-4 items-center">
            <div className="w-1/2 max-md:w-full mt-1">
              <input
                className={`max-md:w-full ${error ? "input-login-error " : "input-login"} `}
                onChange={handleChange}
                name="name"
                required
                minLength={3}
                id="name"
                type="text"
                value={structure?.name || ""}
              />
            </div>
            <div className="flex justify-end items-end max-md:w-full max-md:justify-center">
              <button disabled={loading} type="submit" className="px-4 h-11 justify-end items-end w-36 max-md:w-1/2 max-md:items-start  disabled:cursor-not-allowed py-2 bg-blue-600 hover:bg-blue-500  transition-all duration-300 text-white rounded-md">
                {loading ? <>Rename...<Spin className=" text-red-700" /> </> : "Rename"}
              </button>
            </div>
          </div>
        </form>
      </article>
      <article className="p-6 space-y-6">
        <div className="flex justify-between items-center max-md:flex-col gap-4">
          <div className="max-md:w-full">
            <p className="font-semibold">Delete this structure</p>
            <p>Once you delete a structure, there is no going back. </p>
          </div>
          <Popover content={
            <div className="flex flex-col items-center justify-center gap-2">
              <p>¿Are you sure you want to delete this structure?</p>
              <button
                onClick={() => handleDeleteStructure()}
                type="button"
                className="hover:bg-red-500 transition-all duration-300 bg-red-600 p-2 rounded-lg text-white-color font-semibold" >
                I'm sure
              </button>
            </div>
          }
            title={`Delete Structure`} trigger="click">
            <button type="button" className="px-4 max-md:w-full max-md:items-start  disabled:cursor-not-allowed py-2 bg-red-600 hover:bg-red-500  transition-all duration-300 text-white rounded-md">Delete Structure</button>
          </Popover>
        </div>
      </article>

    </section>
  )
}