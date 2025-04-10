import { useState } from "react"
import { TabButtons } from "../../../components/Tab/TabButtons";
import TabContent from "../../../components/Tab/TabContent";
import ModalService from "../../../components/Tab/ModalService";
import { Tab } from "@/users/userSoldier/models/Tab";
import { Services } from "@/users/userSoldier/models/Profile";


export default function TabServices({ services }: { services: Services | null | undefined }) {
  const [statusTab, setStatusTab] = useState<Tab>('completed')

  return (
    <section className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 h-80 max-md:h-full bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg border border-gray-color">
      <TabButtons onTabChange={setStatusTab} />
      <TabContent unfinished={services?.unfinished} completed={services?.completed.slice(1,3)} statusTab={statusTab} />
      <ModalService services={services} setStatusTab={setStatusTab} statusTab={statusTab} />
    </section>
  )
}


