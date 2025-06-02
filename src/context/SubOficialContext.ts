import { createContext, useContext } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { FormEditSubOfficial, FormSubOficial, SubOficial } from "@/users/userOficial/models/SubOficial.models"

interface SubOficialContextType {
  subOficial: SubOficial[]
  loading: boolean
  pagination: Omit<Pagination<SubOficial>, 'content'> | null
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchSubOficials: (idStructure: string, search?: string,) => void
  create: (payload: Omit<FormSubOficial, 'id_user'>) => Promise<SubOficial | 'BAD_REQUEST' | undefined>
  remove: (payload: number[]) => Promise<void>
  update: (payload: FormEditSubOfficial) => Promise<void>
}

export const SubOficialContext = createContext<SubOficialContextType | undefined>(undefined)

export const useSubOficialContext = () => {
  const context = useContext(SubOficialContext)
  if (!context) {
    throw new Error("useSubOficialContext must be used within a SubOficialProvider")
  }
  return context
}
