import { useEffect, useState } from 'react';
import { deleteSoldierById, getSoldierList } from '@/users/userSubOficial/services/SoldierService';
import { useGlobalContext } from '@/context/globalContext';
import { initialStateStructure, Soldier, Structure } from '@/users/userSubOficial/models/Soldier.models';
import { SearchOutlined } from '@ant-design/icons';
import Tbody from './Table/Tbody';
import FormSoldier from './ModalFormSoldier';
import Thead from './Table/Thead';
import HeaderTable from '@/users/shared/HeaderTable';
import { getStructureMilitary } from '@/users/userSubOficial/services/AdminService';

export const TableSoldier = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([])
  const [structure, setStructure] = useState<Structure>(initialStateStructure)

  const [selectedSoldiers, setSelectedSoldiers] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { authTokens } = useGlobalContext()

  const fetchSoldierList = async () => {
    if (!authTokens) return
    const resSoldier = await getSoldierList(authTokens.token)
    const resStructure = await getStructureMilitary(authTokens.token)

    if (resSoldier) setSoldiers(resSoldier)
    if (resStructure) setStructure(resStructure)
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
        <HeaderTable
          title='Soldiers'
          handleDelete={handleDeleteSoldiers}
          selected={selectedSoldiers}
          totalElements={soldiers.length}
        />
        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <FormSoldier
              structure={structure}
              reloadTable={fetchSoldierList}
            />
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
              structure={structure}
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

