import { useEffect, useState } from 'react';
import { getSoldierList } from '@/users/userSubOficial/services/SoldierService';
import { useGlobalContext } from '@/context/globalContext';
import { Soldier } from '@/users/userSubOficial/models/Soldier.models';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Tbody from './Table/Tbody';
import FormSoldier from './ModalFormSoldier';
import Thead from './Table/Thead';

export const TableSoldier = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([])
  const [selectedSoldiers, setSelectedSoldiers] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 10
  const { authTokens } = useGlobalContext()
  useEffect(() => {
    const fetchSoldierList = async () => {
      if (!authTokens) return
      const res = await getSoldierList(authTokens.token)
      if (res) setSoldiers(res)
    }
    fetchSoldierList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectAll = () => {
    if (selectedSoldiers.length === soldiers.length) {
      setSelectedSoldiers([])
    } else {
      setSelectedSoldiers(soldiers.map((soldier) => soldier.id_user))
    }
  }

  const handleSelect = (id: number) => {
    if (selectedSoldiers.includes(id)) {
      setSelectedSoldiers(selectedSoldiers.filter((soldierID) => soldierID !== id))
    } else {
      setSelectedSoldiers([...selectedSoldiers, id])
    }
  }


  const filteredSoldiers = soldiers.filter(
    (soldier) =>
      soldier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soldier.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soldier.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soldier.barrack.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soldier.army_body.toLowerCase().includes(searchQuery.toLowerCase()),
  )


  const handleDeleteSoldiers = () => {
    console.log(selectedSoldiers)
  }

  // Pagination logic
  const totalPages = Math.ceil(soldiers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSoldiers = soldiers.slice(startIndex, startIndex + itemsPerPage)

  // Handle page change
  const goToPage = (page: number) => {
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning or end
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Manage Soldiers</h1>
              <p className="text-gray-500 mt-1">{filteredSoldiers.length} Soldiers Found</p>
            </div>
            <div className="flex gap-2">
              {selectedSoldiers.length > 0 && (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  onClick={handleDeleteSoldiers}
                >
                  <DeleteOutlined size={16} />
                  <span>Delete Selected ({selectedSoldiers.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <FormSoldier />
            <div className="flex gap-3">
              <div className="relative">
                <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search soldiers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <Thead
              handleSelectAll={handleSelectAll}
              selectedSoldiers={selectedSoldiers}
              soldiersData={soldiers}
            />
            <Tbody
              sortedSoldiers={paginatedSoldiers}
              selectedSoldiers={selectedSoldiers}
              handleSelect={handleSelect}
              filteredSoldiers={filteredSoldiers}
            />
          </table>
        </div>
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredSoldiers.length)}</span> of{" "}
            <span className="font-medium">{filteredSoldiers.length}</span> soldiers
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={index}
                  className={`w-9 h-9 flex items-center justify-center rounded-md ${page === currentPage
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-1">
                  {page}
                </span>
              ),
            )}
            <button
              className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

