import React, { useState } from "react"
import { Barrack } from "@/models/Barrack.models"
import { BarrackContext } from "@/context/BarrackContext"
import { createBarrack, deleteBarrack, getBarracksList, updateBarrack } from "@/users/userOficial/services/BarrackService"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"

export const BarrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [barracks, setBarracks] = useState<Barrack[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<Barrack>, 'content'> | null>(null)
  const [page, setPage] = useState(0)
  const { authTokens } = useGlobalContext()

  const fetchBarracks = async () => {
    if (!authTokens) return
    setLoading(true)
    const data = await getBarracksList(authTokens.token, page)
    if (data) {
      setBarracks(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: Omit<Barrack, 'id_barrack'>) => {
    if (!authTokens) return
    setLoading(true)
    const newBarrack = await createBarrack(authTokens.token, payload)
    if (newBarrack) {
      setBarracks(prev => [newBarrack, ...prev])
    }
    setLoading(false)
  }

  const update = async (payload: Barrack) => {
    if (!authTokens) return

    setLoading(true)
    await updateBarrack(authTokens.token, payload)
    setBarracks(prev =>
      prev.map(b => (b.id_barrack === payload.id_barrack ? payload : b))
    )
    setLoading(false)
  }

  const remove = async (ids: number[]) => {
    if (!authTokens) return

    setLoading(true)
    await deleteBarrack(authTokens.token, ids)
    setBarracks(prev => prev.filter(b => !ids.includes(b.id_barrack)))
    setLoading(false)
  }

  return (
    <BarrackContext.Provider
      value={{
        barracks,
        setPage,
        page,
        loading,
        pagination,
        fetchBarracks,
        create,
        update,
        remove,
      }}
    >
      {children}
    </BarrackContext.Provider>
  )
}
