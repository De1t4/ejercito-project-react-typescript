import { useGlobalContext } from "@/context/globalContext"
import { AssignedServices, Service } from "@/users/userSubOficial/models/Services.models"
import { getListAssignedServices } from "@/users/userSubOficial/services/AssignedService"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import Thead from "./Table/Thead"
import Tbody from "./Table/Tbody"
import ModalFormService from "./ModalFormService"
import PaginationTable from "@/users/shared/PaginationTable"
import HeaderTable from "@/users/shared/HeaderTable"
import { Soldier } from "@/users/userSubOficial/models/Soldier.models"
import { getSoldiers } from "@/users/userSubOficial/services/SoldierService"
import { getServices } from "@/users/userSoldier/services/AssignmetsService"

export default function TableServices() {
  const [assignedServices, setAssignedServices] = useState<Pagination<AssignedServices>>()
  const [services, setServices] = useState<Service[]>([])
  const [soldiers, setSoldiers] = useState<Soldier[]>([])
  const [page, setPage] = useState(0)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { authTokens } = useGlobalContext()

  const fetchAssignedServicesList = async () => {
    if (!authTokens) return
    const res = await getListAssignedServices(authTokens.token, page)
    const resSoldiers = await getSoldiers(authTokens.token)
    const resServices = await getServices(authTokens.token)
    if (res) setAssignedServices(res)
    if (resSoldiers) setSoldiers(resSoldiers)
    if (resServices) setServices(resServices)
  }

  useEffect(() => {
    fetchAssignedServicesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeleteServices = () => {
    console.log(selectedServices)
  }

  const handleSelectAll = () => {
    if (selectedServices.length === assignedServices?.content.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(assignedServices?.content.map((soldier) => soldier.id_services_soldiers) || [])
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
        totalElements={assignedServices?.totalElements}
        selected={selectedServices}
      />
      {/* Toolbar */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <ModalFormService
            reloadTable={fetchAssignedServicesList}
            services={services}
            soldiers={soldiers}
          />
          <div className="flex gap-3">
            <div className="relative w-full">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search soldiers"
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
            servicesData={assignedServices?.content}
          />
          <Tbody
            reloadTable={fetchAssignedServicesList}
            services={services}
            handleDeleteService={handleDeleteServices}
            assignedServices={assignedServices?.content}
            selectedServices={selectedServices}
            handleSelect={handleSelect}
          />
        </table>
      </div>
      <PaginationTable
        page={page}
        first={assignedServices?.first}
        title={"services"}
        setPage={setPage}
        totalElements={assignedServices?.totalElements}
        last={assignedServices?.last}
      />
    </div>
  )
}

