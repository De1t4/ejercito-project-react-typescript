import { useEffect, useState } from "react"
import HeaderTable from "@/shared/components/HeaderTable"
import { SearchOutlined } from "@ant-design/icons"
import PaginationTable from "@/shared/components/PaginationTable"
import Tbody from "./components/Tbody"
import ModalFormBarrack from "./components/ModalFormBarrack"
import Theader from "@/shared/components/Theader"
import { useBarrackContext } from "@/context/BarrackContext"
import toast from "react-hot-toast"

export default function UserBarracks() {
  const { fetchBarracks, remove, setPage } = useBarrackContext()
  const { barracks, page, pagination } = useBarrackContext()
  const [selectedBarracks, setSelectedBarracks] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchBarracks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeleteBarracks = async () => {
    await remove(selectedBarracks)
    fetchBarracks()
    setSelectedBarracks([])
    toast.success("Barracks were deleted.")
  }

  const handleSelectAll = () => {
    if (selectedBarracks.length === barracks?.length) {
      setSelectedBarracks([])
    } else {
      setSelectedBarracks(barracks?.map((barracks) => barracks.id_barrack) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedBarracks.includes(id)) {
      setSelectedBarracks(selectedBarracks.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedBarracks([...selectedBarracks, id])
    }
  }

  const handleDeleteBarrack = async (id: number) => {
    await remove([id])
    if (selectedBarracks.includes(id)) {
      setSelectedBarracks(selectedBarracks.filter((idSelect) => idSelect != id))
    }
    toast.success(`Barrack with ID ${id} was deleted.`)
  }


  return (
    <div className=" ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeleteBarracks}
          title="Barracks"
          totalElements={pagination?.totalElements}
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
                id="input-search"
                aria-label="Search barracks"
                placeholder="Search barracks..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => fetchBarracks(searchQuery)} className='w-10 border bg-slate-100 h-full rounded-md hover:bg-slate-200 transition-all duration-300 '>
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
            content={barracks?.length}
            handleSelectAll={handleSelectAll}
            items={["ID Barrack", "Name", "Location"]}
          />
          <Tbody
            barracks={barracks}
            selectedBarracks={selectedBarracks}
            handleSelect={handleSelect}
            handleDeleteBarrack={handleDeleteBarrack}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={pagination?.first}
        title={"barracks"}
        setPage={setPage}
        totalElements={pagination?.totalElements}
        last={pagination?.last}
      />
    </div>
  )
}