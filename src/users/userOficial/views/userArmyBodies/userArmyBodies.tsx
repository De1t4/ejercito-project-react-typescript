import { useGlobalContext } from "@/context/globalContext"
import { ArmyBody } from "@/models/ArmyBody.models"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import { useEffect, useState } from "react"
import { getArmyBodiesList } from "../../services/BodyService"
import HeaderTable from "@/shared/components/HeaderTable"
import PaginationTable from "@/shared/components/PaginationTable"
import { SearchOutlined } from "@ant-design/icons"
import ModalFormBody from "./components/ModalFormBody"
import Tbody from "./components/Tbody"
import Theader from "@/shared/components/Theader"

export default function UserArmyBodies() {
  const [selectedBodies, setSelectedBodies] = useState<number[]>([])
  const [page, setPage] = useState<number>(0)
  const [bodies, setBodies] = useState<Pagination<ArmyBody>>()
  const { authTokens } = useGlobalContext()


  const fetchBodiesList = async () => {
    if (!authTokens) return
    const res = await getArmyBodiesList(authTokens?.token, page)
    if (res?.empty && page > 0) {
      setPage(0)
      return 
    }
    if (res) setBodies(res)
  }

  useEffect(() => {

    fetchBodiesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeletebodies = async () => {
    console.log(selectedBodies)
  }

  const handleSelectAll = () => {
    if (selectedBodies.length === bodies?.content.length) {
      setSelectedBodies([])
    } else {
      setSelectedBodies(bodies?.content.map((bodies) => bodies.id_body) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedBodies.includes(id)) {
      setSelectedBodies(selectedBodies.filter((idSelect) => idSelect != id) || [])
    } else {
      setSelectedBodies([...selectedBodies, id])
    }
  }


  return (
    <div className="p-6 ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <HeaderTable
          handleDelete={handleDeletebodies}
          title="bodies"
          totalElements={bodies?.totalElements}
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
                placeholder="Search bodies..."
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
            selected={selectedBodies}
            content={bodies?.content.length}
            handleSelectAll={handleSelectAll}
            items={["ID Army Body", "Denomination"]}
          />
          <Tbody
            handleDeleteBody={handleDeletebodies}
            bodies={bodies?.content}
            selectedbodies={selectedBodies}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={bodies?.first}
        title={"bodies"}
        setPage={setPage}
        totalElements={bodies?.totalElements}
        last={bodies?.last}
      />
    </div>
  )
}