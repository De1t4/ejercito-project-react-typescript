import React, { useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import { Company } from "@/models/Company.models"
import { createCompany, deleteCompany, getCompaniesList, updateCompany } from "@/users/userOficial/services/CompanyService"
import { CompanyContext } from "./CompanyContext"

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<Company>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchCompanies = async (search: string = "") => {
    if (!authTokens) return
    setLoading(true)
    const data = await getCompaniesList(authTokens.token, search, page)
    if (data) {
      setCompanies(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: Omit<Company, 'id_company'>) => {
    if (!authTokens) return
    setLoading(true)
    await createCompany(authTokens.token, payload)
    setLoading(false)
  }

  const update = async (payload: Company) => {
    if (!authTokens) return
    setLoading(true)
    const loadCompany = await updateCompany(authTokens.token, payload)
    if (loadCompany) {
      setCompanies(prev =>
        prev.map(b => (b.id_company === payload.id_company ? loadCompany : b))
      )
    }
    setLoading(false)
  }


  const remove = async (ids: number[]) => {
    if (!authTokens) return
    setLoading(true)
    await deleteCompany(authTokens.token, ids)
    setCompanies(prev => prev.filter(b => !ids.includes(b.id_company)))
    setLoading(false)
  }

  return (
    <CompanyContext.Provider
      value={{
        companies,
        setPage,
        page,
        loading,
        pagination,
        fetchCompanies,
        create,
        update,
        remove,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
