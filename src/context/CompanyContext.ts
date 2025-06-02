import { createContext, useContext } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { Company } from "@/models/Company.models"

interface CompanyContextType {
  companies: Company[]
  loading: boolean
  pagination: Omit<Pagination<Company>, 'content'> | null
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchCompanies: (idStructure: string, search?: string) => void
  create: (payload: Omit<Company, 'id_company'>) => Promise<void>
  update: (payload: Company) => Promise<void>
  remove: (ids: number[]) => Promise<void>
}

export const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export const useCompanyContext = () => {
  const context = useContext(CompanyContext)
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider")
  }
  return context
}
