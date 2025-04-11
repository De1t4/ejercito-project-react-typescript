import { Completed, Unfinished } from "../../models/Profile";

interface TabContentProps {
  statusTab: 'completed' | 'pending'
  completed: Completed[] | null | undefined
  unfinished: Unfinished[] | null | undefined
  handleFinishService: (id: number) => void
}

export default function TabContent({ statusTab, completed, unfinished, handleFinishService }: TabContentProps) {


  return (
    <div key={"tab"} className=" flex flex-col gap-4   ">
      {
        statusTab === 'completed' ? (
          <>
            {completed?.length == 0 || completed == null ?
              <div className=" h-20 flex justify-center items-center">
                <h5 className="h5-style text-center">No services completed</h5>
              </div>
              :
              completed?.map((service) => (
                <>
                  <div key={service.id_services_soldier} className=" max-md:text-sm bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
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
                unfinished?.length == 0 || unfinished == null ?
                  <div className=" h-20 flex justify-center items-center">
                    <h5 className="h5-style  text-center">No services pending</h5>
                  </div> : unfinished?.map((service) => (
                    <>
                      <div key={service.id_services_soldier} className=" max-md:text-sm bg-beige-color py-2 px-5 rounded-md flex justify-center flex-col shadow-lg">
                        <div className="flex justify-between items-center ">
                          <div className="">
                            <p>Servicio #{service.id_services_soldier}</p>
                            <p>{service.description}</p>
                            <p>Date init: {service.at_service}</p>
                          </div>
                          <div className="">
                            <button type="button" onClick={() => handleFinishService(service.id_services_soldier)} className="btn-finish">Finish</button>
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