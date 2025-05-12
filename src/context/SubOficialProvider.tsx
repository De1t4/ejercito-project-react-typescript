import { useState } from "react"
import { SubOficialContext } from "./SubOficialContext"
import { FormEditSubOfficial, FormSubOficial, SubOficial } from "@/users/userOficial/models/SubOficial.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import { createSubOficial, deleteSubOficial, getSubOfficialsList, updateSubOficial } from "@/users/userOficial/services/SubOficialService"
import toast from "react-hot-toast"

export const SubOficialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subOficial, setSubOficials] = useState<SubOficial[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<SubOficial>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchSubOficials = async (search: string = "") => {
    if (!authTokens) return
    setLoading(true)
    const data = await getSubOfficialsList(authTokens.token, search, page)
    if (data) {
      if (data.empty) {
        const newData = await getSubOfficialsList(authTokens.token, search, 0)
        if (newData) {
          setSubOficials(newData.content)
          setPagination(newData)
          setLoading(false)
          return
        }
      }
      setSubOficials(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: FormSubOficial) => {
    if (!authTokens) return
    setLoading(true)
    const res = await createSubOficial(authTokens.token, payload)
    setLoading(false)
    return res;
  }

  const remove = async (ids: number[]) => {
    if (!authTokens) return
    setLoading(true)
    await deleteSubOficial(authTokens.token, ids)
    setSubOficials(prev => prev.filter(b => !ids.includes(b.id_user)))
    setLoading(false)
  }

  const update = async (payload: FormEditSubOfficial) => {
    if (!authTokens) return
    setLoading(true)
    const res = await updateSubOficial(authTokens.token, payload)
    if (res == "BAD_REQUEST") {
      toast("The username already exists.", { icon: "🚧" })
    }
    setLoading(false)
  }


  return (
    <SubOficialContext.Provider
      value={{
        subOficial,
        setPage,
        page,
        loading,
        pagination,
        fetchSubOficials,
        create,
        remove,
        update
      }}
    >
      {children}
    </SubOficialContext.Provider>
  )
}