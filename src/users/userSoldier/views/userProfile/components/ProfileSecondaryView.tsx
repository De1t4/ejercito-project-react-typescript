import { useGlobalContext } from '@/context/globalContext';
import { TabButtons } from '@/users/userSoldier/components/Tab/TabButtons';
import TabContent from '@/users/userSoldier/components/Tab/TabContent';
import { Tab } from '@/users/userSoldier/models/Tab.models';
import { handleFinishService } from '@/users/userSoldier/services/AssignmetsService';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SecondaryView = ({ handleScreenView }: { handleScreenView: (typeScreen: 'primary' | 'secondary') => void }) => {
  const { authTokens, reloadProfile, profile } = useGlobalContext()
  const [statusTab, setStatusTab] = useState<Tab>('completed')

  const finishService = async (id: number) => {
    if (authTokens?.token === undefined) return
    await handleFinishService([id], authTokens?.token)
    reloadProfile()

    // setServiceData((prev) => {
    //   const peddingServices = prev.unfinished.filter((pendding) => pendding.id_services_soldier !== id)
    //   const finishServices = [...prev.completed, ...prev.unfinished.filter((pedding) => pedding.id_services_soldier === id)]
    //   return {
    //     ...prev,
    //     unfinished: peddingServices,
    //     completed: finishServices
    //   }
    // })
  }
  return (
    <motion.div
      key="secondary"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="w-[60rem] max-lg:w-full m-auto border-gray-color border p-10 rounded-lg shadow-lg bg-beige-clear-color">
        <div className="  border flex items-center justify-between mb-4">
          <h1 className='text-2xl text-left font-medium'>List of services</h1>
          <div className="flex justify-end">
            <button onClick={() => handleScreenView('primary')} type="button" className="bg-red-color h-7 shadow-lg text-sm hover:bg-red-color/90 transition-all duration-300 font-medium text-white-color w-40 rounded-xl mt-2 ">Return home</button>
          </div>
        </div>
        <section className=" relative pt-14 ">
          <TabButtons onTabChange={setStatusTab} />
          <TabContent
            handleFinishService={finishService}
            unfinished={profile.services?.unfinished}
            completed={profile?.services?.completed}
            statusTab={statusTab}
          />
        </section>
      </div>
    </motion.div>
  );
}

export default SecondaryView;
