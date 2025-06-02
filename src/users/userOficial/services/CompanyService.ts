import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { Company } from "../../../models/Company.models"
import { urlParams } from "@/utils/utils"

const API_URL = import.meta.env.VITE_BACK_END_URL

export const getCompaniesList = async (token: string, search: string, idStructure: string, page: number, size: number = 10) => {
  try {
    const res = await fetch(`${API_URL}/v1/companies?${urlParams(search.trim(), page, size, idStructure).toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error("Error fetching companies")
    }
    const data: Pagination<Company> = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching companies", err)
  }
}

export const createCompany = async (token: string, payload: Omit<Company, 'id_company'>) => {
  try {
    const res = await fetch(`${API_URL}/v1/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error create company")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error create company", err)
  }
}

export const updateCompany = async (token: string, payload: Company) => {
  try {
    const res = await fetch(`${API_URL}/v1/companies`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error("Error edit company")
    }
    const data: Company = await res.json()
    return data
  } catch (err) {
    console.error("Error edit company", err)
  }
}

export const deleteCompany = async (token: string, payload: number[]) => {
  try {
    const res = await fetch(`${API_URL}/v1/companies/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_company: payload })
    })
    if (!res.ok) {
      throw new Error("Error deleted company")
    }
    return "SUCCESS"
  } catch (err) {
    console.error("Error deleted company", err)
  }
}