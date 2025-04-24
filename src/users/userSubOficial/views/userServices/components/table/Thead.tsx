import { AssignedServices } from "@/users/userSubOficial/models/Services.models";
import { Checkbox } from "antd";

interface TheadProps {
  handleSelectAll: () => void
  servicesData: AssignedServices[] | undefined
  selectedServices: number[]
}

export default function Thead({ handleSelectAll, selectedServices, servicesData }: TheadProps) {
  return (
    <thead>
      <tr className="bg-gray-50 text-left border shadow-md">
        <th className="p-3 w-12">
          <Checkbox
            checked={selectedServices.length === servicesData?.length && servicesData.length > 0}
            onChange={handleSelectAll} />
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer">
          <div className="flex items-center gap-1">
            ID
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            Service
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            Init Service
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            End Service
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer">
          <div className="flex items-center gap-1">
            Soldier
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
      </tr>
    </thead>
  )
}