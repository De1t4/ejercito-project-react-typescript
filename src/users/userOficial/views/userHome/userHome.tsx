import { useState } from "react"
import { Link } from "react-router-dom"
import SectionActions from "./components/SectionActions"
import SectionStructures from "./components/SectionStructures"
import FormStructure from "./components/FormStructure"


export default function UserHome() {
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false)

  const handleCreateStructure = () => {
    setIsCreatePanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsCreatePanelOpen(false)
  }

  return (
    <>
      <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md w-full z-40 h-20 sticky top-0 max-lg:w-full">
        <div className="flex justify-between items-center w-full m-auto">
          <div className="flex items-center justify-center gap-x-2">
            <div className=" max-md:block text-xl text-white-color ">
            </div>
            <Link to={"/home"} className="text-xl font-bold text-white-color">Military App</Link>
          </div>
          <div className="flex gap-x-4 text-white-color max-md:hidden">
            <p>User: <span className=" font-semibold">test</span></p>
          </div>

        </div>
      </nav>
      <main className="py-6 max-w-7xl m-auto max-md:py-6 px-16 max-md:px-4 max-lg:px-10">
        <SectionStructures
          handleOpenPanel={handleCreateStructure}
        />
        <SectionActions />
      </main>
      <FormStructure
        closePanel={handleClosePanel}
        isOpenPanel={isCreatePanelOpen}
      />
    </>
  )
}