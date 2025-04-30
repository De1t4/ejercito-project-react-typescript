import React, { useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import { ArmyBodyContext } from "./ArmyBodyContext"
import { ArmyBody } from "@/models/ArmyBody.models"
import { createBody, deleteBody, getArmyBodiesList, updateBody } from "@/users/userOficial/services/BodyService"

export const ArmyBodyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bodies, setBodies] = useState<ArmyBody[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<ArmyBody>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchBodies = async () => {
    if (!authTokens) return
    setLoading(true)
    const data = await getArmyBodiesList(authTokens.token, page)
    if (data) {
      setBodies(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: Omit<ArmyBody, 'id_body'>) => {
    if (!authTokens) return
    setLoading(true)
    await createBody(authTokens.token, payload)
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
