import { Completed, Unfinished } from "../../models/Profile";

interface TabContentProps {
  statusTab: 'completed' | 'pending'
  completed: Completed[] | null | undefined
  unfinished: Unfinished[] | null | undefined
}

export default function TabContent({ statusTab, completed, unfinished }: TabContentProps) {
  return (
    <div className="flex flex-col gap-4 max-md:text-sm max-md:flex-col max-md:leading-6">
      {
        statusTab === 'completed' ? (
          <>
            {completed == null ? <h5 className="h5-style text-center">No services completed</h5> :
              completed?.map((service) => (
                <>
                  <div key={service.id_services_soldier} className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                    <p>Servicio #{service.id_services_soldier}</p>
                    <p>{service.description}</p>
                    <div className="flex justify-between max-md:flex-col ">
                      <p>Date init: {service.at_service}</p>
                      <p>Date finish: {service.end_service}</p>
                    </div>
                  </div>
                </>
              ))
            }
          </>
        ) :
          (
            <>
              {
                unfinished == null ? <h5 className="h5-style text-center">No services pending</h5> : unfinished?.map((service) => (
                  <>
                    <div key={service.id_services_soldier} className="bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                      <div className="flex justify-between items-center ">
                        <div className="">
                          <p>Servicio #{service.id_services_soldier}</p>
                          <p>{service.description}</p>
                          <p>Date init: {service.at_service}</p>
                        </div>
                        <div className="">
                          <button className="w-20 transition-all duration-300 hover:bg-primary-color/80 shadow-md bg-primary-color/90 text-white-color font-medium p-2 rounded-lg">Finish</button>
                        </div>
                      </div >
                    </div>
                  </>
                ))
              }
            </>
          )
      }
    </div>
  )
}