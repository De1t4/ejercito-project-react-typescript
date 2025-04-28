import { DeleteOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";


export default function PopoverDelete({ handleDelete, title }: { handleDelete: () => void, title: string }) {
  return (
    <Popover content={<>
      <div className=" flex flex-col items-center justify-center gap-2">
        <p>¿Are you sure you want to delete this {title}?</p>
        <button
          className="hover:bg-red-500 transition-all duration-300 bg-red-600 p-2 rounded-lg text-white-color font-semibold" onClick={() => handleDelete()}>
          I'm sure
        </button>
      </div>
    </>} title={`Delete ${title}`} trigger="click">
      <Tooltip title={`Delete ${title}`}>
        <button className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors">
          <DeleteOutlined size={20} />
        </button>
      </Tooltip>
    </Popover>

  )
}