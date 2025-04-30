import { Barrack } from "@/models/Barrack.models";
import PopoverDelete from "@/shared/components/PopoverDelete";
import { Checkbox } from "antd";
import ModalEditBarrack from "./ModalEditBarrack";
import { useBarrackContext } from "@/context/BarrackContext";

interface TbodyProps {
  barracks: Barrack[] | undefined
  selectedBarracks: number[]
  handleSelect: (id: number) => void
}

export default function Tbody({ barracks, selectedBarracks, handleSelect }: TbodyProps) {
  const { fetchBarracks, remove } = useBarrackContext()

  const handleDeleteBarrack = async (id:number) => {
    await remove([id])
    fetchBarracks()
  }

  return (
    <tbody className="bg-white">
      {barracks && barracks.map((barrack) => (
        <tr
          key={barrack.id_barrack}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedBarracks.includes(barrack.id_barrack) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              checked={selectedBarracks.includes(barrack.id_barrack)}
              onChange={() => handleSelect(barrack.id_barrack)}
            />
          </td>
          <td className="p-4 font-medium">{barrack.id_barrack}</td>
          <td className="p-4 ">{barrack.name}</td>
          <td className="p-4 ">{barrack.location}</td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <ModalEditBarrack barrack={barrack} />
              <PopoverDelete title="barrack" handleDelete={() => handleDeleteBarrack(barrack.id_barrack)}></PopoverDelete>
            </div>
          </td>
        </tr>
      ))}
      {barracks === undefined && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No barracks found matching your search criteria.
          </td>
        </tr>
      )}
      {barracks?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No barracks found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}