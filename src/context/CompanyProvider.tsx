import React, { useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useGlobalContext } from "./globalContext"
import { Company } from "@/models/Company.models"
import { createCompany, deleteCompany, getCompaniesList, updateCompany } from "@/users/userOficial/services/CompanyService"
import { CompanyContext } from "./CompanyContext"
import toast from "react-hot-toast"

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Omit<Pagination<Company>, 'content'> | null>(null)
  const [page, setPage] = useState<number>(0)
  const { authTokens } = useGlobalContext()

  const fetchCompanies = async (idStructure: string, search: string = "") => {
    if (!authTokens) return
    setLoading(true)
    const data = await getCompaniesList(authTokens.token, search, idStructure, page)
    if (data) {
      if (data.empty) {
        const newData = await getCompaniesList(authTokens.token, search, idStructure, 0)
        if (newData) {
          setCompanies(newData.content)
          setPagination(newData)
          setLoading(false)
          return
        }
      }
      setCompanies(data.content)
      setPagination(data)
    }
    setLoading(false)
  }

  const create = async (payload: Omit<Company, 'id_company'>) => {
    if (!authTokens) return
    setLoading(true)
    const res = await createCompany(authTokens.token, payload)
    if (res === "SUCCESS") toast.success("Company created successfully.")
    setLoading(false)
  }

  const update = async (payload: Company) => {
    if (!authTokens) return
    setLoading(true)
    const loadCompany = await updateCompany(authTokens.token, payload)
    if (loadCompany) {
      toast.success("Company updated successfully.")
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
