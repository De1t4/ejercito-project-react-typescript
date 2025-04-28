import { useGlobalContext } from "@/context/globalContext"
import { useEffect, useState } from "react"
import { getSubOfficialsList } from "../../services/SubOficialService"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { SubOficial } from "../../models/SubOficial.models"
import HeaderTable from "@/shared/components/HeaderTable"
import PaginationTable from "@/shared/components/PaginationTable"
import { SearchOutlined } from "@ant-design/icons"
import { initialStateStructure, Structure } from "@/users/userSubOficial/models/Soldier.models"
import { getStructureMilitary } from "@/users/userSubOficial/services/AdminService"
import Tbody from "./components/Tbody"
import Theader from "@/shared/components/Theader"

export default function UserSubOficials() {
  const [selectedSubOficial, setSelectedSubOficial] = useState<number[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_strucuture, setStructure] = useState<Structure>(initialStateStructure)
  const [page, setPage] = useState(0)
  const [subOficial, setsubOficial] = useState<Pagination<SubOficial>>()
  const { authTokens } = useGlobalContext()

  const fetchSubOficialList = async () => {
    if (!authTokens) return
    const res = await getSubOfficialsList(authTokens?.token, page)
    const resStructure = await getStructureMilitary(authTokens.token)

    if (res) setsubOficial(res)
    if (resStructure) setStructure(resStructure)
  }

  useEffect(() => {

    fetchSubOficialList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeletesubOficial = async () => {
    console.log(selectedSubOficial)
  }

  const handleSelectAll = () => {
    if (selectedSubOficial.length === subOficial?.content.length) {
      setSelectedSubOficial([])
    } else {
      setSelectedSubOficial(subOficial?.content.map((subOficial) => subOficial.id_user) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedSubOficial.includes(id)) {
      setSelectedSubOficial(selectedSubOficial.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedSubOficial([...selectedSubOficial, id])
    }
  }

  return (
    <div className="p-6 ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeletesubOficial}
          title="Sub Oficial"
          totalElements={subOficial?.totalElements}
          selected={selectedSubOficial}
        />
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex gap-3">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-md:flex flex gap-1">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search subOficial"
                placeholder="Search subOficial..."
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
            selected={selectedSubOficial}
            content={subOficial?.content.length}
            handleSelectAll={handleSelectAll}
            items={["ID User", "Username", "Soldier"]}
          />
          <Tbody
            selectedsubOficials={selectedSubOficial}
            handleDeleteSubOficial={handleDeletesubOficial}
            subOficials={subOficial?.content}
            handleSelect={handleSelect}   
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={subOficial?.first}
        title={"Sub Oficial"}
        setPage={setPage}
        totalElements={subOficial?.totalElements}
        last={subOficial?.last}
      />
    </div>
  )
}