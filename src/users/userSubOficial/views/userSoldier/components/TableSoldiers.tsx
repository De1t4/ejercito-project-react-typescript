import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/globalContext';
import { initialStateStructure, Soldier, Structure } from '@/users/userSubOficial/models/Soldier.models';
import { SearchOutlined } from '@ant-design/icons';
import Tbody from './Table/Tbody';
import FormSoldier from './ModalFormSoldier';
import { getSoldierList, getStructureMilitary } from '@/users/userSubOficial/services/AdminService';
import { Pagination } from '@/users/userSubOficial/models/Pagination.models';
import { deleteSoldierById } from '@/users/userSubOficial/services/SoldierService';
import HeaderTable from '@/shared/components/HeaderTable';
import PaginationTable from '@/shared/components/PaginationTable';
import Theader from '@/shared/components/Theader';
import toast from 'react-hot-toast';

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
    if (resSoldier?.empty && page > 0) {
      setPage(0)
      return 
    }
    if (resSoldier) setSoldiers(resSoldier)
    const resStructure = await getStructureMilitary(authTokens.token)
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
    toast.success("Selected soldiers were deleted.")
    setSelectedSoldiers([])
    fetchSoldierList()
  }

  const handleDeleteSoldier = async (id: number) => {
    if (!authTokens) return
    await deleteSoldierById(authTokens.token, [id])
    toast.success(`Soldier with ID ${id} was deleted.`)
    if (selectedSoldiers.includes(id)) {
      setSelectedSoldiers(selectedSoldiers.filter((soldierID) => soldierID !== id))
    }
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
                  id='search-input'
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
        <div className="overflow-x-auto bg-white">
          <table className="w-full">
            <Theader
              handleSelectAll={handleSelectAll}
              selected={selectedSoldiers}
              items={["ID", "Username", "Fullname", "Company", "Barrack", "Army Body"]}
              content={soldiers?.content.length}
            />
            <Tbody
              handleDeleteSoldier={handleDeleteSoldier}
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
        />
      </div>
    </>
  );
};
