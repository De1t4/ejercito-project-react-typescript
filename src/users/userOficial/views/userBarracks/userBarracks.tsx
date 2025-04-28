import { useGlobalContext } from "@/context/globalContext"
import { Barrack } from "@/models/Barrack.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useEffect, useState } from "react"
import { getBarracksList } from "../../services/BarrackService"
import HeaderTable from "@/shared/components/HeaderTable"
import { SearchOutlined } from "@ant-design/icons"
import PaginationTable from "@/shared/components/PaginationTable"
import Tbody from "./components/Tbody"
import ModalFormBarrack from "./components/ModalFormBarrack"
import Theader from "@/shared/components/Theader"

export default function UserBarracks() {
  const [selectedBarracks, setSelectedBarracks] = useState<number[]>([])
  const [page, setPage] = useState(0)
  const [barracks, setBarracks] = useState<Pagination<Barrack>>()
  const { authTokens } = useGlobalContext()

  useEffect(() => {
    const fetchbarracksList = async () => {
      if (!authTokens) return
      const res = await getBarracksList(authTokens?.token, page)
      if (res) setBarracks(res)
    }
    fetchbarracksList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeletebarracks = async () => {
    console.log(selectedBarracks)
  }

  const handleSelectAll = () => {
    if (selectedBarracks.length === barracks?.content.length) {
      setSelectedBarracks([])
    } else {
      setSelectedBarracks(barracks?.content.map((barracks) => barracks.id_barrack) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedBarracks.includes(id)) {
      setSelectedBarracks(selectedBarracks.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedBarracks([...selectedBarracks, id])
    }
  }


  return (
    <div className="p-6 ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeletebarracks}
          title="barracks"
          totalElements={barracks?.totalElements}
          selected={selectedBarracks}
        />
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <ModalFormBarrack />
          <div className="flex gap-3">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-md:flex flex gap-1">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search barracks"
                placeholder="Search barracks..."
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
            selected={selectedBarracks}
            content={barracks?.content.length}
            handleSelectAll={handleSelectAll}
            items={["ID Barrack", "Name", "Location"]}
          />
          <Tbody
            handleDeleteBarrack={handleDeletebarracks}
            barracks={barracks?.content}
            selectedBarracks={selectedBarracks}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={barracks?.first}
        title={"barracks"}
        setPage={setPage}
        totalElements={barracks?.totalElements}
        last={barracks?.last}
      />
    </div>
  )
}