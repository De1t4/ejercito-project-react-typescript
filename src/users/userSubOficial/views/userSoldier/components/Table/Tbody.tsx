import { Soldier } from "@/users/userSubOficial/models/Soldier.models";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Checkbox from "antd/es/checkbox";
import { Link } from "react-router-dom";

interface TbodyProps {
  sortedSoldiers: Soldier[]
  selectedSoldiers: number[]
  handleSelect: (id: number) => void
  filteredSoldiers: Soldier[]
}

export default function Tbody({ sortedSoldiers, selectedSoldiers, handleSelect, filteredSoldiers }: TbodyProps) {
  return (
    <tbody>
      {sortedSoldiers.map((soldier) => (
        <tr
          key={soldier.id_user}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedSoldiers.includes(soldier.id_user) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              checked={selectedSoldiers.includes(soldier.id_user)}
              onChange={() => handleSelect(soldier.id_user)}
            />
          </td>
          <td className="p-4 font-medium">{soldier.id_user}</td>
          <td className="p-4 text-gray-600">{soldier.username}</td>
          <td className="p-4">{soldier.name}</td>
          <td className="p-4"> {soldier.company}</td>
          <td className="p-4 text-gray-600">{soldier.barrack}</td>
          <td className="p-4 text-gray-600">{soldier.army_body}</td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <Tooltip title="View More">
                <Link to={`/soldiers/${soldier.id_soldier}`}>
                  <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                    <EyeOutlined size={20} />
                  </button>
                </Link>
              </Tooltip>
              <Tooltip title="Edit Soldier">
                <button className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
                  <EditOutlined size={20} />
                </button>
              </Tooltip>
              <Tooltip title="Delete Soldier">
                <button className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                  <DeleteOutlined size={20} />
                </button>
              </Tooltip>

            </div>
          </td>
        </tr>
      ))}
      {filteredSoldiers.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No soldiers found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}