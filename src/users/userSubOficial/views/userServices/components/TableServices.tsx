import { useGlobalContext } from "@/context/globalContext"
import { AssignedServices, Service } from "@/users/userSubOficial/models/Services.models"
import { deleteAssignedService, getListAssignedServices } from "@/users/userSubOficial/services/AssignedService"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Pagination } from "@/users/userSubOficial/models/Pagination.models"
import Tbody from "./Table/Tbody"
import ModalFormService from "./ModalFormService"
import { Soldier } from "@/users/userSubOficial/models/Soldier.models"
import { getSoldiers } from "@/users/userSubOficial/services/SoldierService"
import { getServices } from "@/users/userSoldier/services/AssignmetsService"
import HeaderTable from "@/shared/components/HeaderTable"
import PaginationTable from "@/shared/components/PaginationTable"
import Theader from "@/shared/components/Theader"

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
    const res = await getListAssignedServices(authTokens.token, searchQuery, page)
    // Si no hay resultados y estamos en una página > 0, reiniciamos a la primera
    if (res?.empty && page > 0) {
      setPage(0)
      return // Cortamos, y el useEffect con [page] se vuelve a disparar
    }
    // Si no está vacío, seteamos normalmente
    if (res) setAssignedServices(res)
    // Estas pueden ir en paralelo
    const [resSoldiers, resServices] = await Promise.all([
      getSoldiers(authTokens.token),
      getServices(authTokens.token)
    ])
    if (resSoldiers) setSoldiers(resSoldiers)
    if (resServices) setServices(resServices)
  }

  useEffect(() => {
    fetchAssignedServicesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDeleteServices = async () => {
    if (!authTokens) return
    await deleteAssignedService(authTokens.token, selectedServices)
    fetchAssignedServicesList()
    setSelectedServices([])
  }

  const handleSelectAll = () => {
    if (selectedServices.length === assignedServices?.content.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(assignedServices?.content.map((service) => service.id_services_soldiers) || [])
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
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-md:flex flex gap-1">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                aria-label="Search services"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className='w-10 border bg-slate-100 h-full rounded-md hover:bg-slate-200 transition-all duration-300 ' onClick={fetchAssignedServicesList}>
                <SearchOutlined />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <Theader
            handleSelectAll={handleSelectAll}
            selected={selectedServices}
            items={["ID", "Service", "At Service", "End Service", "Soldier"]}
            content={assignedServices?.content.length}
          />
          <Tbody
            reloadTable={fetchAssignedServicesList}
            services={services}
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

