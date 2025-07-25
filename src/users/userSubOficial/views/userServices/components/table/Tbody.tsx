import { AssignedServices, Service } from "@/users/userSubOficial/models/Services.models"
import { DeleteOutlined } from "@ant-design/icons"
import { Checkbox, Popover, Tooltip } from "antd"
import ModalEditService from "../ModalEditService"

interface TbodyProps {
  assignedServices: AssignedServices[] | undefined
  selectedServices: number[]
  services: Service[]
  handleSelect: (id: number) => void
  reloadTable: () => void
  deleteAssignedServiceId: (id: number) => void
}

export default function Tbody({ assignedServices, services, selectedServices, handleSelect, reloadTable, deleteAssignedServiceId }: TbodyProps) {


  const contentPopover = (id_service: number) => {
    return (
      <>
        <div className=" flex flex-col items-center justify-center gap-2">
          <p>¿Are you sure you want to delete this services?</p>
          <button className="hover:bg-red-500 transition-all duration-300 bg-red-600 p-2 rounded-lg text-white-color font-semibold"
            onClick={() => deleteAssignedServiceId(id_service)}>
            I'm sure
          </button>
        </div>
      </>
    )
  }

  return (
    <tbody>
      {assignedServices?.map((service) => (
        <tr
          key={service.id_services_soldiers}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedServices.includes(service.id_services_soldiers) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              id={`checkbox-${service.id_services_soldiers}`}
              checked={selectedServices.includes(service.id_services_soldiers)}
              onChange={() => handleSelect(service.id_services_soldiers)}
            />
          </td>
          <td className="p-4 font-medium">{service.id_services_soldiers}</td>
          <td className="p-4 text-gray-600">{service.description}</td>
          <td className="p-4">{service.at_service}</td>
          <td className="p-4"> {service.end_service ?? 'N/A'}</td>
          <td className="p-4 text-gray-600">{service.soldier}</td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <ModalEditService
                reloadTable={reloadTable}
                soldier={service}
                services={services}
              />
              <Popover content={contentPopover(service.id_services_soldiers)} title="Delete Service" trigger="click">
                <Tooltip title="Delete Service">
                  <button className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                    <DeleteOutlined size={20} />
                  </button>
                </Tooltip>
              </Popover>
            </div>
          </td>
        </tr>
      ))}
      {assignedServices === undefined && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No services found matching your search criteria.
          </td>
        </tr>
      )}
      {assignedServices?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No services found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}