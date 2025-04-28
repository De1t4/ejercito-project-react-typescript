import { Checkbox } from "antd";

interface TheadProps {
  selected: number[]
  content: number | undefined
  handleSelectAll: () => void
  items: string[]
}

export default function Thead({ selected, content, handleSelectAll, items }: TheadProps) {
  return (
    <thead>
      <tr className="bg-gray-50 text-left border shadow-md">
        <th className="p-3 w-12">
          <Checkbox
            checked={selected.length === content && content > 0}
            onChange={handleSelectAll} />
        </th>
        {
          items.map((item) => (
            <th key={item} className="p-4 font-medium text-gray-600 cursor-pointer">

              <div className="flex items-center gap-1">
                {item}
              </div>
            </th>

          ))
        }
        <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
      </tr>
    </thead>
  )
}