import { useGlobalContext } from '@/context/globalContext';
import { deleteStructure } from '@/users/userOficial/services/StructureService';
import { Popover } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const StructureDelete = () => {
  const { authTokens } = useGlobalContext()
  const { idStructure } = useParams()
  if (!idStructure) return
  if (!authTokens) return


  const redirect = useNavigate()

  const handleDeleteStructure = async () => {
    const res = await deleteStructure(authTokens.token, idStructure)
    if (res)
      toast.success("Structure was deleted")
    redirect("/home")
  }

  return (
    <article className="p-6 space-y-6">
      <div className="flex justify-between items-center max-md:flex-col gap-4">
        <div className="max-md:w-full">
          <p className="font-semibold">Delete this structure</p>
          <p>Once you delete a structure, there is no going back. </p>
        </div>
        <Popover content={
          <div className="flex flex-col items-center justify-center gap-2">
            <p>¿Are you sure you want to delete this structure?</p>
            <button
              onClick={() => handleDeleteStructure()}
              type="button"
              className="hover:bg-red-500 transition-all duration-300 bg-red-600 p-2 rounded-lg text-white-color font-semibold" >
              I'm sure
            </button>
          </div>
        }
          title={`Delete Structure`} trigger="click">
          <button type="button" className="px-4 max-md:w-full max-md:items-start  disabled:cursor-not-allowed py-2 bg-red-600 hover:bg-red-500  transition-all duration-300 text-white rounded-md">Delete Structure</button>
        </Popover>
      </div>
    </article>
  );
}

export default StructureDelete;
