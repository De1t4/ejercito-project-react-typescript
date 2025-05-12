import React, { useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import { ArmyBodyContext } from "./ArmyBodyContext"
import { ArmyBody } from "@/models/ArmyBody.models"
import { createBody, deleteBody, getArmyBodiesList, updateBody } from "@/users/userOficial/services/BodyService"
import toast from "react-hot-toast"

export const ArmyBodyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bodies, setBodies] = useState<ArmyBody[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<ArmyBody>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchBodies = async (search: string = "") => {
    if (!authTokens) return
    setLoading(true)
    const data = await getArmyBodiesList(authTokens.token, search, page)
    if (data) {
      if (data.empty) {
        const newData = await getArmyBodiesList(authTokens.token, search, 0)
        if (newData) {
          setBodies(newData.content)
          setPagination(newData)
          setLoading(false)
          return
        }
      }
      setBodies(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: Omit<ArmyBody, 'id_body'>) => {
    if (!authTokens) return
    setLoading(true)
    await createBody(authTokens.token, payload)
    toast.success("Army body created successfully.")
    setLoading(false)
  }

  const update = async (payload: ArmyBody) => {
    if (!authTokens) return
    setLoading(true)
    const loadArmyBody = await updateBody(authTokens.token, payload)
    if (loadArmyBody) {
      setBodies(prev =>
        prev.map(b => (b.id_body === payload.id_body ? loadArmyBody : b))
      )
    }
    toast.success("Army body updated successfully.")
    setLoading(false)
  }


  const remove = async (ids: number[]) => {
    if (!authTokens) return
    setLoading(true)
    await deleteBody(authTokens.token, ids)
    setBodies(prev => prev.filter(b => !ids.includes(b.id_body)))
    setLoading(false)
  }

  return (
    <ArmyBodyContext.Provider
      value={{
        bodies,
        setPage,
        page,
        loading,
        pagination,
        fetchBodies,
        create,
        update,
        remove,
      }}
    >
      {children}
    </ArmyBodyContext.Provider>
  )
}
