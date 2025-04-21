import { AssignedServices } from "@/users/userSubOficial/models/Services.models"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Checkbox, Popover, Tooltip } from "antd"

interface TbodyProps {
  sortedServices: AssignedServices[] | undefined
  selectedServices: number[]
  handleSelect: (id: number) => void
  filteredServices: AssignedServices[] | undefined
  handleDeleteService: (id: number) => void
}

export default function Tbody({ sortedServices, selectedServices, handleSelect, filteredServices, handleDeleteService }: TbodyProps) {
  const contentPopover = (id_service: number) => {
    return (
      <>
        <div className=" flex flex-col items-center justify-center gap-2">
          <p>¿Are you sure you want to delete this soldier?</p>
          <button className="hover:bg-red-500 transition-all duration-300 bg-red-600 p-2 rounded-lg text-white-color font-semibold" onClick={() => handleDeleteService(id_service)}>
            I'm sure
          </button>
        </div>
      </>
    )
  }

  return (
    <tbody>
      {sortedServices?.map((services) => (
        <tr
          key={services.id_services_soldiers}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedServices.includes(services.id_services_soldiers) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              checked={selectedServices.includes(services.id_services_soldiers)}
              onChange={() => handleSelect(services.id_services_soldiers)}
            />
          </td>
          <td className="p-4 font-medium">{services.id_services_soldiers}</td>
          <td className="p-4 text-gray-600">{services.description}</td>
          <td className="p-4">{services.at_service}</td>
          <td className="p-4"> {services.end_service ?? 'N/A'}</td>
          <td className="p-4 text-gray-600">{services.soldier}</td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <Tooltip title="Edit Service">
                <button onClick={() => console.log(services)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
                  <EditOutlined size={20} />
                </button>
              </Tooltip>
              <Popover content={contentPopover(services.id_services_soldiers)} title="Delete Service" trigger="click">
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
      {filteredServices?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No services found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}