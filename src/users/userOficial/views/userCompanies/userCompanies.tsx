import { Company } from "@/models/Company.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useEffect, useState } from "react"
import { getCompaniesList } from "../../services/CompanyService"
import { useGlobalContext } from "@/context/globalContext"
import HeaderTable from "@/shared/components/HeaderTable"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import Thead from "@/shared/components/THead"
import { Checkbox } from "antd"


export default function UserCompanies() {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const [companies, setCompanies] = useState<Pagination<Company>>()
  const { authTokens } = useGlobalContext()

  useEffect(() => {
    const fetchCompaniesList = async () => {
      if (!authTokens) return
      const res = await getCompaniesList(authTokens?.token, 0)
      if (res) setCompanies(res)
    }
    fetchCompaniesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteCompanies = async () => {
    console.log(selectedCompanies)
  }


  const handleSelectAll = () => {
    if (selectedCompanies.length === companies?.content.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(companies?.content.map((companies) => companies.id_company) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedCompanies([...selectedCompanies, id])
    }
  }

  return (
    <div className="p-6 ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeleteCompanies}
          title="Companies"
          totalElements={companies?.totalElements}
          selected={selectedCompanies}
        />
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusOutlined size={16} />
            <span>Add Company</span>
          </button>
          <div className="flex gap-3">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-md:flex flex gap-1">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search companies"
                placeholder="Search companies..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className='w-10 border bg-slate-100 h-full rounded-md hover:bg-slate-200 transition-all duration-300 '>
                <SearchOutlined />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <Thead
            selected={selectedCompanies}
            content={companies?.content.length}
            handleSelectAll={handleSelectAll}
            items={["ID Company", "Activity"]}
          />
          <tbody className="bg-gray-50">
            {companies?.content && companies.content.map((company) => (
              <tr
                key={company.id_company}
                className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedCompanies.includes(company.id_company) ? "bg-blue-50" : ""
                  }`}
              >
                <td className="p-3">
                  <Checkbox
                    checked={selectedCompanies.includes(company.id_company)}
                    onChange={() => handleSelect(company.id_company)}
                  />
                </td>
                <td className="p-4 font-medium">{company.id_company}</td>
                <td className="p-4 text-gray-600">{company.activity}</td>

                <td className="p-4">

                </td>
              </tr>
            ))}
            {companies?.content === undefined && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No soldiers found matching your search criteria.
                </td>
              </tr>
            )}
            {companies?.content?.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No companies found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}