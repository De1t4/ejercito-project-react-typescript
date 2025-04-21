interface PropsPagination {
  totalElements: number | undefined
  last: boolean | undefined
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function PaginationTable({ totalElements, last, page, setPage }: PropsPagination) {
  return (
    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Total
        <span className="font-medium"> {totalElements}</span> services
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <p className="p-2 w-10 h-10 rounded-md border text-center cursor-pointer bg-gray-100 font-bold border-gray-400 text-gray-600 hover:bg-gray-100 ">{page}</p>
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