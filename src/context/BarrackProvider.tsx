import React, { useState } from "react"
import { Barrack } from "@/models/Barrack.models"
import { BarrackContext } from "@/context/BarrackContext"
import { createBarrack, deleteBarrack, getBarracksList, updateBarrack } from "@/users/userOficial/services/BarrackService"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import toast from "react-hot-toast"

export const BarrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [barracks, setBarracks] = useState<Barrack[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<Barrack>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchBarracks = async (search: string = "") => {
    if (!authTokens) return
    setLoading(true)
    const data = await getBarracksList(authTokens.token, search, page)
    if (data) {
      if (data.empty) {
        const newData = await getBarracksList(authTokens.token, search, 0)
        if (newData) {
          setBarracks(newData.content)
          setPagination(newData)
          setLoading(false)
          return
        }
      }
      setBarracks(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: Omit<Barrack, 'id_barrack'>) => {
    if (!authTokens) return
    setLoading(true)
    await createBarrack(authTokens.token, payload)
    toast.success("Barrack created successfully.")
    setLoading(false)
  }

  const update = async (payload: Barrack) => {
    if (!authTokens) return
    setLoading(true)
    const loadBarrack = await updateBarrack(authTokens.token, payload)
    if (loadBarrack) {
      setBarracks(prev =>
        prev.map(b => (b.id_barrack === payload.id_barrack ? loadBarrack : b))
      )
    }
    toast.success("Barrack updated successfully.")
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
