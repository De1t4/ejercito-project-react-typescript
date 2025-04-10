import { Modal } from "antd";
import { useState } from "react";
import { TabButtons } from "./TabButtons";
import TabContent from "./TabContent";
import { Services } from "../../models/Profile";

interface ModalServiceProps {
  setStatusTab: (tab: 'completed' | 'pending') => void
  statusTab: 'completed' | 'pending'
  services: Services | null | undefined
}

export default function ModalService({ setStatusTab, statusTab, services }: ModalServiceProps) {
  const [modal1Open, setModal1Open] = useState<boolean>(false);


  return (
    <>
      {
        services?.completed && services?.completed.length > 0 && (
          <div className="flex justify-end">
            <button onClick={() => setModal1Open(true)} className="bg-red-color h-7 hover:bg-red-color/90 transition-all duration-300 font-medium text-white-color w-48 rounded-xl mt-2 ">View More</button>
          </div>
        )
      }
      <Modal
        title={<h5 className="h5-style">Services Assigned</h5>}
        centered
        open={modal1Open}
        style={{ content: "#000" }}
        onOk={() => setModal1Open(false)}
        footer={null}
        width={1000}
        onCancel={() => setModal1Open(false)}
      >
        <div className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg">
          <TabButtons onTabChange={setStatusTab} />
          <select defaultValue={0} className="w-60 p-2 bg-black-color font-medium text-white-color rounded-md mb-4 shadow-md">
            <option value={0} disabled>Sort Services</option>
            <option value="asc">Sort Date Asc</option>
            <option value="desc">Sort Date Desc</option>
          </select>
          <TabContent completed={services?.completed.reverse()} unfinished={services?.unfinished} statusTab={statusTab} />
        </div>
      </Modal>
    </>
  )
}