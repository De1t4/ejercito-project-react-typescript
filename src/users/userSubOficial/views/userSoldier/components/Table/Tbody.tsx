import { Soldier, Structure } from "@/users/userSubOficial/models/Soldier.models";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import Checkbox from "antd/es/checkbox";
import { Link } from "react-router-dom";
import ModalEditSoldier from "../ModalEditSoldier";
import { useGlobalContext } from "@/context/globalContext";
import { deleteSoldierById } from "@/users/userSubOficial/services/SoldierService";

interface TbodyProps {
  soldiers: Soldier[] | undefined
  structure: Structure
  selectedSoldiers: number[]
  reloadTable: () => void
  handleSelect: (id: number) => void
}

export default function Tbody({ soldiers, reloadTable, selectedSoldiers, structure, handleSelect }: TbodyProps) {
  const { authTokens } = useGlobalContext()
  const handleDeleteSoldier = async (id: number) => {
    if (!authTokens) return
    await deleteSoldierById(authTokens.token, [id])
    alert("El soldado fue eliminado")
    reloadTable()
  }

  const contentPopover = (id_user: number) => {
    return (
      <>
        <div className=" flex flex-col items-center justify-center gap-2">
          <p>¿Are you sure you want to delete this soldier?</p>
          <button className="hover:bg-red-500 transition-all duration-300 bg-red-600 p-2 rounded-lg text-white-color font-semibold" onClick={() => handleDeleteSoldier(id_user)}>
            I'm sure
          </button>
        </div>
      </>
    )
  }

  return (
    <tbody>
      {soldiers && soldiers.map((soldier) => (
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
                <Link to={`/soldiers/${soldier.id_user}`}>
                  <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                    <EyeOutlined size={20} />
                  </button>
                </Link>
              </Tooltip>
              <ModalEditSoldier reloadTable={reloadTable} soldier={soldier} structure={structure} />
              <Popover content={contentPopover(soldier.id_user)} title="Delete Soldier" trigger="click">
                <Tooltip title="Delete Soldier">
                  <button className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                    <DeleteOutlined size={20} />
                  </button>
                </Tooltip>
              </Popover>
            </div>
          </td>
        </tr>
      ))}
      {soldiers === undefined && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No soldiers found matching your search criteria.
          </td>
        </tr>
      )}
      {soldiers?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No soldiers found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}