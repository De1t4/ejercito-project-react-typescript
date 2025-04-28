import { Company } from "@/models/Company.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useEffect, useState } from "react"
import { getCompaniesList } from "../../services/CompanyService"
import { useGlobalContext } from "@/context/globalContext"
import HeaderTable from "@/shared/components/HeaderTable"
import { SearchOutlined } from "@ant-design/icons"
import Thead from "@/shared/components/Thead"
import Tbody from "./components/Tbody"
import PaginationTable from "@/shared/components/PaginationTable"
import ModalFormCompany from "./components/ModalFormCompany"


export default function UserCompanies() {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const [page, setPage] = useState(0)
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
          <ModalFormCompany />
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
          <Tbody
            handleDeleteCompany={handleDeleteCompanies}
            companies={companies?.content}
            selectedCompanies={selectedCompanies}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={companies?.first}
        title={"companies"}
        setPage={setPage}
        totalElements={companies?.totalElements}
        last={companies?.last}
      />
    </div>
  )
}