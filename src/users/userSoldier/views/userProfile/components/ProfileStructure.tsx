import { ArmyBody } from "@/models/ArmyBody.models"
import { Barrack } from "@/models/Barrack.models"
import { Company } from "@/models/Company.models"

interface Structure {
  company: Company | undefined
  barrack: Barrack | undefined
  armyBody: ArmyBody | undefined
}

export default function Structure({ company, barrack, armyBody }: Structure) {
  return (
    <section className="max-md:flex max-md:flex-col max-md:gap-4  grid col-span-2 max-md:w-full max-lg:col-span-3 max-md:p-6  bg-beige-clear-color px-10 py-5 rounded-lg shadow-lg border border-gray-color">
      <div className="">
        <h4 className="h5-style">Structure Military</h4>
        <p className="max-md:text-sm">Esta es la estructura militar en la que se encuentra organizado el usuario</p>
      </div>
      <div className=" flex flex-col gap-2 max-md:text-sm ">
        <div className="container-structure">
          <p><span className=" font-medium">Company</span>: {company?.activity ? company.activity : "N/A"}</p>
        </div>
        <div className="bg-beige-color max-md:flex-col max-md:items-start rounded-md py-3 px-4 flex  justify-between items-center">
          <p><span className=" font-medium">Barrack</span>: {barrack?.name ? barrack.name : "N/A"}</p>
          <p><span className=" font-medium">Location</span>: {barrack?.location ? barrack.location : "N/A"}</p>
        </div>
        <div className="container-structure">
          <p><span className=" font-medium">Army Body</span>: {armyBody?.denomination ? armyBody.denomination : "N/A"}</p>
        </div>
      </div>
    </section>
  )
}