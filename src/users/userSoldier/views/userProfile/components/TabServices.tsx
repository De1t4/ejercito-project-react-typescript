import { useState } from "react"
import { TabButtons } from "../../../components/Tab/TabButtons";
import TabContent from "../../../components/Tab/TabContent";
import ModalService from "../../../components/Tab/ModalService";
import { Tab } from "@/users/userSoldier/models/Tab";


export default function TabServices() {
  const [statusTab, setStatusTab] = useState<Tab>('completed')

  return (
    <section className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg border border-gray-color">
      <TabButtons onTabChange={setStatusTab} />
      <TabContent statusTab={statusTab} />
      <ModalService setStatusTab={setStatusTab} statusTab={statusTab} />
    </section>
  )
}


