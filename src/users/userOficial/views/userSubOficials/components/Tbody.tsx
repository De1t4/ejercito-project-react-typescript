import PopoverDelete from "@/shared/components/PopoverDelete";
import { Checkbox } from "antd";
import { SubOficial } from "@/users/userOficial/models/SubOficial.models";

interface TbodyProps {
  subOficials: SubOficial[] | undefined
  selectedsubOficials: number[]
  handleDeleteSubOficial: (id: number) => void
  handleSelect: (id: number) => void
}

export default function Tbody({ subOficials, selectedsubOficials, handleSelect, handleDeleteSubOficial }: TbodyProps) {


  return (
    <tbody className="bg-white">
      {subOficials && subOficials.map((SubOficial) => (
        <tr
          key={SubOficial.id_user}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedsubOficials.includes(SubOficial.id_user) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              checked={selectedsubOficials.includes(SubOficial.id_user)}
              onChange={() => handleSelect(SubOficial.id_user)}
            />
          </td>
          <td className="p-4 font-medium">{SubOficial.id_user}</td>
          <td className="p-4 ">{SubOficial.username}</td>
          <td className="p-4">
            {
              SubOficial.soldier != null ?(<>
                {SubOficial.soldier.name} {SubOficial.soldier.lastname}
              </>) :"N/A"
            }
          </td>

          <td className="p-4">
            <div className="flex justify-end gap-2">
              <PopoverDelete title="Sub Oficial" handleDelete={() => handleDeleteSubOficial(SubOficial.id_user)}></PopoverDelete>
            </div>
          </td>
        </tr>
      ))}
      {subOficials === undefined && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No Sub Oficial found matching your search criteria.
          </td>
        </tr>
      )}
      {subOficials?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No Oficial found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}