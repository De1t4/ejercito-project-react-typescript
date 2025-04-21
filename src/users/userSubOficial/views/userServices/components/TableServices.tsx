import { useGlobalContext } from "@/context/globalContext"
import { AssignedServices } from "@/users/userSubOficial/models/Services.models"
import { getListAssignedServices } from "@/users/userSubOficial/services/AssignedService"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import Thead from "./table/Thead"
import Tbody from "./table/Tbody"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"

export default function TableServices() {
  const [services, setServices] = useState<Pagination<AssignedServices>>()
  const [page, setPage] = useState(1)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { authTokens } = useGlobalContext()

  const fetchAssignedServicesList = async () => {
    if (!authTokens) return
    const res = await getListAssignedServices(authTokens.token, page)
    if (res) setServices(res)
  }

  useEffect(() => {
    fetchAssignedServicesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeleteServices = () => {
    console.log(selectedServices)
  }

  const handleSelectAll = () => {
    if (selectedServices.length === services?.content.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(services?.content.map((soldier) => soldier.id_services_soldiers) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((serviceId) => serviceId !== id))
    } else {
      setSelectedServices([...selectedServices, id])
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Assigned Services</h1>
            <p className="text-gray-500 mt-1">{services?.content.length} Assigned Services Found</p>
          </div>
          <div className="flex gap-2">
            {selectedServices.length > 0 && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                onClick={handleDeleteServices}
              >
                <DeleteOutlined size={16} />
                <span>Delete Selected ({selectedServices.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Toolbar */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          {/* <FormSoldier reloadTable={fetchSoldierList} /> */}
          <div className="flex gap-3">
            <div className="relative w-full">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search soldiers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <Thead
            handleSelectAll={handleSelectAll}
            selectedServices={selectedServices}
            servicesData={services?.content}
          />
          <Tbody
            handleDeleteService={handleDeleteServices}
            sortedServices={services?.content}
            selectedServices={selectedServices}
            handleSelect={handleSelect}
            filteredServices={services?.content}
          />
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end items-center">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          {page}
          <button
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(page + 1)}
            disabled={services?.last}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}