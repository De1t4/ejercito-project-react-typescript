import { useEffect, useState } from "react"
import HeaderTable from "@/shared/components/HeaderTable"
import PaginationTable from "@/shared/components/PaginationTable"
import { SearchOutlined } from "@ant-design/icons"
import Tbody from "./components/Tbody"
import Theader from "@/shared/components/Theader"
import { useSubOficialContext } from "@/context/SubOficialContext"
import ModalFormSubOficial from "./components/ModalFormSubOficial"
import { initialStateStructure, Structure } from "@/users/userSubOficial/models/Soldier.models"
import { getStructureMilitary } from "@/users/userSubOficial/services/AdminService"
import { useGlobalContext } from "@/context/globalContext"

export default function UserSubOficials() {
  const { authTokens } = useGlobalContext()
  const [selectedSubOficial, setSelectedSubOficial] = useState<number[]>([])
  const { page, fetchSubOficials, setPage, remove, subOficial, pagination } = useSubOficialContext()
  const [structure, setStructure] = useState<Structure>(initialStateStructure)


  useEffect(() => {
    const fetchStructureData = async () => {
      if (!authTokens) return
      const res = await getStructureMilitary(authTokens?.token)
      if (res) setStructure(res)
    }
    fetchSubOficials()
    fetchStructureData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeleteSubOficial = async (id: number) => {
    await remove([id])
    if (selectedSubOficial.includes(id)) {
      setSelectedSubOficial(selectedSubOficial.filter((i) => i != id))
    }
  }

  const handleSelectAll = () => {
    if (selectedSubOficial.length === subOficial?.length) {
      setSelectedSubOficial([])
    } else {
      setSelectedSubOficial(subOficial?.map((subOficial) => subOficial.id_user) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedSubOficial.includes(id)) {
      setSelectedSubOficial(selectedSubOficial.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedSubOficial([...selectedSubOficial, id])
    }
  }

  const handleDeleteSubOficials = async () => {
    await remove(selectedSubOficial)
    fetchSubOficials()
    setSelectedSubOficial([])
  }

  return (
    <div className="">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeleteSubOficials}
          title="Sub Oficial"
          totalElements={pagination?.totalElements}
          selected={selectedSubOficial}
        />
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex  max-lg:flex-col  gap-3 justify-between">
          <ModalFormSubOficial structure={structure} />
          <div className="flex gap-3 ">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full  max-lg:flex flex gap-1">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search Sub Oficial"
                placeholder="Search Sub Oficial..."
                className="pl-10 pr-4  py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  w-full"
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
            content={subOficial.length}
            handleSelectAll={handleSelectAll}
            items={["ID User", "Username", "Soldier"]}
          />
          <Tbody
            structure={structure}
            selectedsubOficials={selectedSubOficial}
            handleDeleteSubOficial={handleDeleteSubOficial}
            subOficials={subOficial}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={pagination?.first}
        title={"Sub Oficial"}
        setPage={setPage}
        totalElements={pagination?.totalElements}
        last={pagination?.last}
      />
    </div>
  )
}