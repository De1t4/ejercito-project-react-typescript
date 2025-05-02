import { useState } from "react"
import { SubOficialContext } from "./SubOficialContext"
import { FormSubOficial, SubOficial } from "@/users/userOficial/models/SubOficial.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import { createSubOficial, deleteSubOficial, getSubOfficialsList } from "@/users/userOficial/services/SubOficialService"


export const SubOficialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subOficial, setSubOficials] = useState<SubOficial[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<SubOficial>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchSubOficials = async () => {
    if (!authTokens) return
    setLoading(true)
    const data = await getSubOfficialsList(authTokens.token, page)
    if (data) {
      setSubOficials(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: FormSubOficial) => {
    if (!authTokens) return
    setLoading(true)
    await createSubOficial(authTokens.token, payload)
    setLoading(false)
  }

  const remove = async (ids: number[]) => {
    if (!authTokens) return
    setLoading(true)
    await deleteSubOficial(authTokens.token, ids)
    setSubOficials(prev => prev.filter(b => !ids.includes(b.id_user)))
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
        remove
      }}
    >
      {children}
    </SubOficialContext.Provider>
  )
}