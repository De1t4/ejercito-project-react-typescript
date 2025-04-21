import { useGlobalContext } from "@/context/globalContext"
import { AssignedServices } from "@/users/userSubOficial/models/Services.models"
import { getListAssignedServices } from "@/users/userSubOficial/services/AssignedService"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import Thead from "./Table/Thead"
import Tbody from "./Table/Tbody"
import ModalFormService from "./ModalFormService"
import PaginationTable from "./Pagination"
import HeaderTable from "@/users/shared/HeaderTable"

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
      <HeaderTable
        handleDelete={handleDeleteServices}
        title="Services"
        totalElements={services?.totalElements}
        selected={selectedServices}
      />
      {/* Toolbar */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <ModalFormService />
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
      <PaginationTable
        page={page}
        setPage={setPage}
        totalElements={services?.totalElements}
        last={services?.last}
      />
    </div>
  )
}