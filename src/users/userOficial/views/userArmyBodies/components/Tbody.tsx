import { ArmyBody } from "@/models/ArmyBody.models";
import PopoverDelete from "@/shared/components/PopoverDelete";
import { Checkbox } from "antd";
import ModalEditBody from "./ModalEditBody";
import { useArmyBodyContext } from "@/context/ArmyBodyContext";

interface TbodyProps {
  bodies: ArmyBody[] | undefined
  selectedbodies: number[]
  handleSelect: (id: number) => void
}

export default function Tbody({ bodies, selectedbodies, handleSelect }: TbodyProps) {
  const { remove, fetchBodies } = useArmyBodyContext()
  const handleDeleteBody = async (id: number) => {
    await remove([id])
    fetchBodies()
  }

  return (
    <tbody className="bg-white">
      {bodies && bodies.map((body) => (
        <tr
          key={body.id_body}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedbodies.includes(body.id_body) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              checked={selectedbodies.includes(body.id_body)}
              onChange={() => handleSelect(body.id_body)}
            />
          </td>
          <td className="p-4 font-medium">{body.id_body}</td>
          <td className="p-4 ">{body.denomination}</td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <ModalEditBody body={body} />
              <PopoverDelete title="body" handleDelete={() => handleDeleteBody(body.id_body)}></PopoverDelete>
            </div>
          </td>
        </tr>
      ))}
      {bodies === undefined && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No bodies found matching your search criteria.
          </td>
        </tr>
      )}
      {bodies?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No bodies found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}