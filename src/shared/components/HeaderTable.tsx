import { DeleteOutlined } from "@ant-design/icons";

interface HeaderProps {
  totalElements: number | undefined
  title: string
  selected: number[]
  handleDelete: () => void
}

export default function HeaderTable({ totalElements, title, selected, handleDelete }: HeaderProps) {
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Assigned {title}</h1>
          <p className="text-gray-500 mt-1">{totalElements} Assigned {title} Found</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              onClick={handleDelete}
            >
              <DeleteOutlined size={16} />
              <span>Delete Selected ({selected.length})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}