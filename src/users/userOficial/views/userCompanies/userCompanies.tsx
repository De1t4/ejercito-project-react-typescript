import { useEffect, useState } from "react"
import HeaderTable from "@/shared/components/HeaderTable"
import { SearchOutlined } from "@ant-design/icons"
import Tbody from "./components/Tbody"
import PaginationTable from "@/shared/components/PaginationTable"
import ModalFormCompany from "./components/ModalFormCompany"
import Theader from "@/shared/components/Theader"
import { useCompanyContext } from "@/context/CompanyContext"


export default function UserCompanies() {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const { fetchCompanies, remove, setPage } = useCompanyContext()
  const { companies, page, pagination } = useCompanyContext()

  useEffect(() => {
    fetchCompanies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeleteCompanies = async () => {
    remove(selectedCompanies)
    fetchCompanies()
  }

  const handleSelectAll = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(companies.map((companies) => companies.id_company) || [])
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
    <div className="">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeleteCompanies}
          title="Companies"
          totalElements={pagination?.totalElements}
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
          <Theader
            selected={selectedCompanies}
            content={companies.length}
            handleSelectAll={handleSelectAll}
            items={["ID Company", "Activity"]}
          />
          <Tbody
            companies={companies}
            selectedCompanies={selectedCompanies}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={pagination?.first}
        title={"companies"}
        setPage={setPage}
        totalElements={pagination?.totalElements}
        last={pagination?.last}
      />
    </div>
  )
}