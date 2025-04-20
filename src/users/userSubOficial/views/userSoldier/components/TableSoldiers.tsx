import { useEffect, useState } from 'react';
import { deleteSoldierById, getSoldierList } from '@/users/userSubOficial/services/SoldierService';
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
  const { authTokens } = useGlobalContext()

  const fetchSoldierList = async () => {
    if (!authTokens) return
    const res = await getSoldierList(authTokens.token)
    if (res) setSoldiers(res)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 10;
  const initPage = (currentPage - 1) * productosPorPagina;
  const endPage = currentPage * productosPorPagina;
  const totalPaginas = Math.ceil(soldiers.length / productosPorPagina);

  const beforeProduct = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const nextProduct = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPaginas));


  useEffect(() => {
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


  // const filteredSoldiers = soldiers.filter(
  //   (soldier) =>
  //     soldier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     soldier.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     soldier.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     soldier.barrack.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     soldier.army_body.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  const handleDeleteSoldier = async (id: number) => {
    if (!authTokens) return
    await deleteSoldierById(authTokens.token, id)
    alert("El soldado fue eliminado")
    fetchSoldierList()
  }

  const handleDeleteSoldiers = () => {
    console.log(selectedSoldiers)
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Manage Soldiers</h1>
              <p className="text-gray-500 mt-1">{soldiers.length} Soldiers Found</p>
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
            <FormSoldier reloadTable={fetchSoldierList} />
            <div className="flex gap-3">
              <div className="relative w-full">
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
              handleDeleteSoldier={handleDeleteSoldier}
              sortedSoldiers={soldiers.slice(initPage, endPage)}
              selectedSoldiers={selectedSoldiers}
              handleSelect={handleSelect}
              filteredSoldiers={soldiers}
            />
          </table>
        </div>
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={beforeProduct}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <p
                key={index}
                className={` w-9 h-9 flex items-center justify-center  rounded-md hover:cursor-pointer border border-gray-300 text-gray-600 hover:bg-gray-100 ${index + 1 === currentPage ? "font-bold bg-blue-500" : "text-base bg-blue-100"}"
                  }`}
                onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </p>
            ))}
            <button
              className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={nextProduct}
              disabled={currentPage === totalPaginas}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

