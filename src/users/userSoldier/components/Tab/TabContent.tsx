export default function TabContent({statusTab}: { statusTab: 'completed' | 'pending' }) {
  return (
    <div className="flex flex-col gap-4 max-md:text-sm max-md:flex-col max-md:leading-6">
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
  )
}