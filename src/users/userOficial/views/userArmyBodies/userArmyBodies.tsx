import { useEffect, useState } from "react"
import HeaderTable from "@/shared/components/HeaderTable"
import PaginationTable from "@/shared/components/PaginationTable"
import { SearchOutlined } from "@ant-design/icons"
import ModalFormBody from "./components/ModalFormBody"
import Tbody from "./components/Tbody"
import Theader from "@/shared/components/Theader"
import { useArmyBodyContext } from "@/context/ArmyBodyContext"
import toast from "react-hot-toast"

export default function UserArmyBodies() {
  const [selectedBodies, setSelectedBodies] = useState<number[]>([])
  const { fetchBodies, remove, setPage } = useArmyBodyContext()
  const { bodies, page, pagination } = useArmyBodyContext()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchBodies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])


  const handleSelectAll = () => {
    if (selectedBodies.length === bodies.length) {
      setSelectedBodies([])
    } else {
      setSelectedBodies(bodies.map((bodies) => bodies.id_body) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedBodies.includes(id)) {
      setSelectedBodies(selectedBodies.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedBodies([...selectedBodies, id])
    }
  }

  const handleDeleteBodies = async () => {
    await remove(selectedBodies)
    toast.success("Army bodies were deleted.")
    setSelectedBodies([])
    fetchBodies()
  }


  const handleDeleteBody = async (id: number) => {
    await remove([id])
    if (selectedBodies.includes(id)) {
      setSelectedBodies(selectedBodies.filter((idSelect) => idSelect != id))
    }
    toast.success(`Army body with ID ${id} was deleted.`)
  }


  return (
    <div className=" ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeleteBodies}
          title="Bodies"
          totalElements={pagination?.totalElements}
          selected={selectedBodies}
        />
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <ModalFormBody />
          <div className="flex gap-3">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-md:flex flex gap-1">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search bodies"
                id="input-search"
                placeholder="Search bodies..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => fetchBodies(searchQuery)} className='w-10 border bg-slate-100 h-full rounded-md hover:bg-slate-200 transition-all duration-300 '>
                <SearchOutlined />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <Theader
            selected={selectedBodies}
            content={bodies.length}
            handleSelectAll={handleSelectAll}
            items={["ID Army Body", "Denomination"]}
          />
          <Tbody
            handleDeleteBody={handleDeleteBody}
            bodies={bodies}
            selectedbodies={selectedBodies}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={pagination?.first}
        title={"bodies"}
        setPage={setPage}
        totalElements={pagination?.totalElements}
        last={pagination?.last}
      />
    </div>
  )
}