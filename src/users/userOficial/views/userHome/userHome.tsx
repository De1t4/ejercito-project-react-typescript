import { useState } from "react"
import SectionActions from "./components/SectionActions"
import FormStructure from "./components/FormStructure"
import NavbarHome from "./components/NavbarHome"
import { SectionStructure } from "./components/SectionStructures"
import { useGlobalContext } from "@/context/globalContext"

export default function UserHome() {
  const { authTokens } = useGlobalContext()
  if (!authTokens) return

  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false)

  const handleCreateStructure = () => {
    setIsCreatePanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsCreatePanelOpen(false)
  }

  return (
    <>
      <NavbarHome />
      <main className="py-6 max-w-7xl m-auto max-md:py-6 px-16 max-md:px-4 max-lg:px-10">
        <SectionStructure
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