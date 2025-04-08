import { Modal } from "antd";
import { useState } from "react"

type Tab = 'completed' | 'pending'

export default function TabServices() {
  const [statusTab, setStatusTab] = useState<Tab>('completed')
  const [modal1Open, setModal1Open] = useState<boolean>(false);

  return (
    <section className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg border border-gray-color">
      <div className="flex items-center ">
        <button onClick={() => setStatusTab('completed')} className=" rounded-tl-md  absolute transition-all duration-300 hover:bg-primary-color/90 top-0 left-0 h-12 w-1/2 bg-primary-color text-white-color flex justify-center items-center">
          <p className=" font-medium max-md:text-sm">Completed Services</p>
        </button>
        <button onClick={() => setStatusTab('pending')} className=" rounded-tr-md  absolute transition-all duration-300 hover:bg-primary-color/60 top-0 right-0 h-12 w-1/2 bg-primary-color/50 text-white-color flex justify-center items-center">
          <p className=" font-medium max-md:text-sm">Pending Services</p>
        </button>
      </div>
      <div className="flex flex-col gap-4 max-md:text-sm ">
        {
          statusTab === 'completed' ? (
            <>
              <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                <p>Servicio #439</p>
                <p>Operación de reconocimiento en zona norte</p>
                <div className="flex justify-between max-md:flex-col ">
                  <p>Date init: 10 feb 2025</p>
                  <p>Date finish: 10 feb 2026</p>
                </div>
              </div>
              <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                <p>Servicio #439</p>
                <p>Operación de reconocimiento en zona norte</p>
                <div className="flex justify-between max-md:flex-col ">
                  <p>Date init: 10 feb 2025</p>
                  <p>Date finish: 10 feb 2026</p>
                </div>
              </div>
            </>
          ) :
            (
              <>
                <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                  <p>Servicio #439</p>
                  <p>Operación de reconocimiento en zona norte</p>
                  <div className="flex justify-between max-md:flex-col ">
                    <p>Date init: 10 feb 2025</p>
                  </div>
                </div>
                <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                  <p>Servicio #439</p>
                  <p>Operación de reconocimiento en zona norte</p>
                  <div className="flex justify-between max-md:flex-col ">
                    <p>Date init: 10 feb 2025</p>
                  </div>
                </div>
              </>
            )
        }
      </div>
      <div className="flex justify-end">
        <button onClick={() => setModal1Open(true)} className="bg-red-color h-7 hover:bg-red-color/90 transition-all duration-300 font-medium text-white-color w-48 rounded-xl mt-2 ">View More</button>
      </div>
      <Modal
        title="Services Assigned"
        centered
        open={modal1Open}
        style={{ content: "#000" }}
        onOk={() => setModal1Open(false)}
        footer={null}
        width={1000}
        onCancel={() => setModal1Open(false)}
      >
        <div className="grid relative col-span-2 pt-16 max-md:px-6 max-lg:col-span-3 bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg">
          <div className="flex items-center ">
            <button onClick={() => setStatusTab('completed')} className=" rounded-tl-md  absolute transition-all duration-300 hover:bg-primary-color/90 top-0 left-0 h-12 w-1/2 bg-primary-color text-white-color flex justify-center items-center">
              <p className=" font-medium max-md:text-sm">Completed Services</p>
            </button>
            <button onClick={() => setStatusTab('pending')} className=" rounded-tr-md  absolute transition-all duration-300 hover:bg-primary-color/60 top-0 right-0 h-12 w-1/2 bg-primary-color/50 text-white-color flex justify-center items-center">
              <p className=" font-medium max-md:text-sm">Pending Services</p>
            </button>
          </div>

          <div className="flex flex-col gap-4 max-md:text-sm ">
            {
              statusTab === 'completed' ? (
                <>
                  <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                    <p>Servicio #439</p>
                    <p>Operación de reconocimiento en zona norte</p>
                    <div className="flex justify-between max-md:flex-col ">
                      <p>Date init: 10 feb 2025</p>
                      <p>Date finish: 10 feb 2026</p>
                    </div>
                  </div>
                  <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                    <p>Servicio #439</p>
                    <p>Operación de reconocimiento en zona norte</p>
                    <div className="flex justify-between max-md:flex-col ">
                      <p>Date init: 10 feb 2025</p>
                      <p>Date finish: 10 feb 2026</p>
                    </div>
                  </div>
                  <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                    <p>Servicio #439</p>
                    <p>Operación de reconocimiento en zona norte</p>
                    <div className="flex justify-between max-md:flex-col ">
                      <p>Date init: 10 feb 2025</p>
                      <p>Date finish: 10 feb 2026</p>
                    </div>
                  </div>
                </>
              ) :
                (
                  <>
                    <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                      <p>Servicio #439</p>
                      <p>Operación de reconocimiento en zona norte</p>
                      <div className="flex justify-between max-md:flex-col ">
                        <p>Date init: 10 feb 2025</p>
                      </div>
                    </div>
                    <div className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                      <p>Servicio #439</p>
                      <p>Operación de reconocimiento en zona norte</p>
                      <div className="flex justify-between max-md:flex-col ">
                        <p>Date init: 10 feb 2025</p>
                      </div>
                    </div>
                  </>
                )
            }
          </div>
        </div>
      </Modal>
    </section>
  )
}


