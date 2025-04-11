import { useState } from "react"
import { Tab } from "@/users/userSoldier/models/Tab.models";
import { Services } from "@/users/userSoldier/models/Profile";
import { useGlobalContext } from "@/context/globalContext";
import { handleFinishService } from "@/users/userSoldier/services/AssignmetsService";
import { TabButtons } from "./TabButtons";
import TabContent from "./TabContent";

interface TabServicesProps {
  services: Services | null | undefined
  handleScreenView: (typeScreen: 'primary' | 'secondary') => void
}

export default function TabServices({ services, handleScreenView }: TabServicesProps) {
  const [statusTab, setStatusTab] = useState<Tab>('completed')
  const { authTokens, reloadProfile } = useGlobalContext()

  const finishService = async (id: number) => {
    if (authTokens?.token === undefined) return
    await handleFinishService([id], authTokens?.token)
    reloadProfile()
  }

  return (
    <section className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 h-80 max-md:h-full bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg border border-gray-color">
      <TabButtons onTabChange={setStatusTab} />
      <TabContent handleFinishService={finishService} unfinished={services?.unfinished.slice(0, 2)} completed={services?.completed.slice(1, 3)} statusTab={statusTab} />
      {
        services?.completed && services?.completed.length > 0 && (
          <div onClick={() => handleScreenView('secondary')} className="flex justify-end">
            <button type="button" className="bg-red-color h-7 hover:bg-red-color/90 transition-all duration-300 font-medium text-white-color w-48 rounded-xl mt-2 ">View More</button>
          </div>
        )
      }
    </section>
  )
}


