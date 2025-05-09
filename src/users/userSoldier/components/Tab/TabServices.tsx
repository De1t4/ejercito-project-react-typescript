import { useState } from "react"
import { Tab } from "@/users/userSoldier/models/Tab.models";
import { useGlobalContext } from "@/context/globalContext";
import { handleFinishService } from "@/users/userSoldier/services/AssignmetsService";
import { TabButtons } from "./TabButtons";
import TabContent from "./TabContent";
import { SOLDIER } from "@/shared/constants/Roles";
import { ProfileProps } from "../../models/Profile";

interface TabServicesProps {
  profileSoldier: ProfileProps
  handleScreenView: (typeScreen: 'primary' | 'secondary') => void
}

export default function TabServices({ profileSoldier, handleScreenView }: TabServicesProps) {
  const [statusTab, setStatusTab] = useState<Tab>('pending')
  const { authTokens, profile, reloadProfile } = useGlobalContext()

  const finishService = async (id: number) => {
    if (authTokens?.token === undefined) return
    await handleFinishService([id], authTokens?.token)
    reloadProfile()
  }

  return (
    <section className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 h-80 max-md:h-full bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg border border-gray-color">
      <TabButtons statusTab={statusTab} onTabChange={setStatusTab} />
      <TabContent handleFinishService={finishService} unfinished={profileSoldier?.services?.unfinished.slice(0, 2)} completed={profileSoldier?.services?.completed.slice(0, 2)} statusTab={statusTab} />
      {
        profile.role === SOLDIER && (
          <>
            {
              profileSoldier?.services?.completed && profileSoldier.services.completed.length > 0 && (
                <div onClick={() => handleScreenView('secondary')} className="flex justify-end">
                  <button type="button" className="bg-red-color h-7 hover:bg-red-color/90 transition-all duration-300 font-medium text-white-color w-48 rounded-xl mt-2 ">View More</button>
                </div>
              )
            }
          </>
        )
      }
    </section>
  )
}


