import { createContext, useContext } from "react"
import { Barrack } from "@/models/Barrack.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"

interface BarrackContextType {
  barracks: Barrack[]
  loading: boolean
  pagination: Omit<Pagination<Barrack>, 'content'> | null
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  fetchBarracks: (page?: number, size?: number) => void
  create: (payload: Omit<Barrack, 'id_barrack'>) => Promise<void>
  update: (payload: Barrack) => Promise<void>
  remove: (ids: number[]) => Promise<void>
}

export const BarrackContext = createContext<BarrackContextType | undefined>(undefined)

export const useBarrackContext = () => {
  const context = useContext(BarrackContext)
  if (!context) {
    throw new Error("useBarrackContext must be used within a BarrackProvider")
  }
  return context
}
