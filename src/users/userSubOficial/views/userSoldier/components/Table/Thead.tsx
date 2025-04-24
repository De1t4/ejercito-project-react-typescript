import { Soldier } from "@/users/userSubOficial/models/Soldier.models";
import { Checkbox } from "antd";

interface TheadProps {
  handleSelectAll: () => void
  soldiersData: Soldier[] | undefined
  selectedSoldiers: number[]
}

export default function Thead({handleSelectAll, selectedSoldiers, soldiersData}:TheadProps) {
  return (
    <thead>
      <tr className="bg-gray-50 text-left border shadow-md">
        <th className="p-3 w-12">
          <Checkbox
            checked={selectedSoldiers.length === soldiersData?.length && soldiersData.length > 0}
            onChange={handleSelectAll} />
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer">
          <div className="flex items-center gap-1">
            ID
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            Username
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            Name
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            Company
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer">
          <div className="flex items-center gap-1">
            Barrack
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 cursor-pointer" >
          <div className="flex items-center gap-1">
            Army Body
          </div>
        </th>
        <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
      </tr>
    </thead>
  )
}