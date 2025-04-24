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
import { Pagination } from '@/users/userSubOficial/models/Pagination.models';
import PaginationTable from '../../../../shared/PaginationTable';

export const TableSoldier = () => {
  const [soldiers, setSoldiers] = useState<Pagination<Soldier> | null>(null)
  const [structure, setStructure] = useState<Structure>(initialStateStructure)
  const [page, setPage] = useState<number>(0)
  const [selectedSoldiers, setSelectedSoldiers] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { authTokens } = useGlobalContext()

  const fetchSoldierList = async () => {
    if (!authTokens) return
    const resSoldier = await getSoldierList(authTokens.token, searchQuery, page)
    const resStructure = await getStructureMilitary(authTokens.token)
    if (resSoldier) setSoldiers(resSoldier)
    if (resStructure) setStructure(resStructure)
  }


  useEffect(() => {
    fetchSoldierList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleSelectAll = () => {
    if (selectedSoldiers.length === soldiers?.content.length) {
      setSelectedSoldiers([])
    } else {
      setSelectedSoldiers(soldiers?.content.map((soldier) => soldier.id_user) || [])
    }
  }

  const handleSelect = (id: number) => {
    if (selectedSoldiers.includes(id)) {
      setSelectedSoldiers(selectedSoldiers.filter((soldierID) => soldierID !== id))
    } else {
      setSelectedSoldiers([...selectedSoldiers, id])
    }
  }

  const handleDeleteSoldiers = async () => {
    if (!authTokens) return
    await deleteSoldierById(authTokens.token, selectedSoldiers)
    alert("El soldado fue eliminado")
    setSelectedSoldiers([])
    fetchSoldierList()
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <HeaderTable
          title='Soldiers'
          handleDelete={handleDeleteSoldiers}
          selected={selectedSoldiers}
          totalElements={soldiers?.totalElements}
        />
        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <FormSoldier
              structure={structure}
              reloadTable={fetchSoldierList}
            />
            <div className="flex gap-3">
              <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-md:flex flex gap-1">
                <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search soldiers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='w-10 border bg-slate-100 h-full rounded-md hover:bg-slate-200 transition-all duration-300 ' onClick={fetchSoldierList}>
                  <SearchOutlined />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <Thead
              handleSelectAll={handleSelectAll}
              selectedSoldiers={selectedSoldiers}
              soldiersData={soldiers?.content}
            />
            <Tbody
              structure={structure}
              reloadTable={fetchSoldierList}
              selectedSoldiers={selectedSoldiers}
              handleSelect={handleSelect}
              soldiers={soldiers?.content}
            />
          </table>
        </div>
        <PaginationTable
          page={page}
          first={soldiers?.first}
          title={"soldiers"}
          setPage={setPage}
          totalElements={soldiers?.totalElements}
          last={soldiers?.last}
          empty={soldiers?.empty}
        />
      </div>
    </>
  );
};
