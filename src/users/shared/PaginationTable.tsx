
interface PropsPagination {
  totalElements: number | undefined
  last: boolean | undefined
  first: boolean | undefined
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  title: string
  empty: boolean | undefined
}

export default function PaginationTable({ totalElements, first, last, page, setPage, title, empty }: PropsPagination) {
  if (empty) {
    setPage(0)
  }
  return (
    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Total
        <span className="font-medium"> {totalElements}</span> {title}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(page - 1)}
          disabled={first}
        >
          Previous
        </button>
        <p className="p-2 w-10 h-10 rounded-md border text-center cursor-pointer bg-gray-100 font-bold border-gray-400 text-gray-600 hover:bg-gray-100 ">{page + 1}</p>
        <button
          className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(page + 1)}
          disabled={last}
        >
          Next
        </button>
      </div>
    </div>
  )
}