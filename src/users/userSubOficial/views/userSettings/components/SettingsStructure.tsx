import { useGlobalContext } from "@/context/globalContext"
import { initalStructure, Structure } from "@/models/Structure.models"
import { fetchDataStructures, updateStructure } from "@/users/userOficial/services/StructureService"
import { Spin } from "antd"
import { FormEvent, useEffect, useRef, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import StructureDelete from "./StructureDelete"

export default function SettingsStructure() {
  const [structure, setStructure] = useState<Structure>(initalStructure)
  const structureRef = useRef(initalStructure)
  const { idStructure } = useParams()
  const { authTokens } = useGlobalContext()
  const [error, setError] = useState(false)
  const [isPending, startTransition] = useTransition()
  if (!authTokens) return
  if (!idStructure) return

  const fetchStructure = async () => {
    const data = await fetchDataStructures(authTokens.token, idStructure)
    if (data)
      structureRef.current = data
    setStructure(data)
  }

  const handleSubmitRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (structure?.name.trim() === "") {
      setError(true); return;
    }
    setError(false)
    if (structureRef.current.name === structure.name) {
      toast.error("The name of the structure is the same")
      return
    }
    startTransition(async () => {
      const res = await updateStructure(authTokens.token, structure)
      if (res) {
        toast.success("Rename name structure successful"); structureRef.current = res
      }
    })
  }

  useEffect(() => {
    fetchStructure()
  }, [idStructure])

  return (
    <section className="bg-white rounded-lg shadow border-red-400 border mb-10">
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
                onChange={(e) => setStructure({ ...structure, name: e.target.value })}
                name="name"
                required
                minLength={3}
                id="name"
                type="text"
                value={structure.name}
              />
            </div>
            <div className="flex justify-end items-end max-md:w-full max-md:justify-center">
              <button disabled={isPending || structureRef.current.name === structure.name} type="submit" className="px-4 h-11 justify-end disabled:bg-blue-400 items-end w-36 max-md:w-1/2 max-md:items-start  disabled:cursor-not-allowed py-2 bg-blue-600 hover:bg-blue-500  transition-all duration-300 text-white rounded-md">
                {isPending ? <>Rename...<Spin className=" text-red-700" /> </> : "Rename"}
              </button>
            </div>
          </div>
        </form>
      </article>
      <StructureDelete />

    </section>
  )
}