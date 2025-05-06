import { createContext, useContext } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { ArmyBody } from "@/models/ArmyBody.models"

interface ArmyBodyContextType {
  bodies: ArmyBody[]
  loading: boolean
  pagination: Omit<Pagination<ArmyBody>, 'content'> | null
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchBodies: (search?:string) => void
  create: (payload: Omit<ArmyBody, 'id_body'>) => Promise<void>
  update: (payload: ArmyBody) => Promise<void>
  remove: (ids: number[]) => Promise<void>
}

export const ArmyBodyContext = createContext<ArmyBodyContextType | undefined>(undefined)

export const useArmyBodyContext = () => {
  const context = useContext(ArmyBodyContext)
  if (!context) {
    throw new Error("useArmyBodyContext must be used within a ArmyBodyProvider")
  }
  return context
}
