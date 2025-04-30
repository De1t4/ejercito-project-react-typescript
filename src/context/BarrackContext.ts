import { createContext, useContext } from "react"
import { Barrack } from "@/models/Barrack.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"

interface BarrackContextType {
  barracks: Barrack[]
  loading: boolean
  pagination: Omit<Pagination<Barrack>, 'content'> | null
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchBarracks: () => void
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
