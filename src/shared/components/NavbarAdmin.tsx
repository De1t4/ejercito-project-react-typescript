import { useGlobalContext } from "@/context/globalContext"
import { MenuOutlined } from "@ant-design/icons"

export default function NavbarAdmin({openSidebar}:{openSidebar: () => void}) {
  const { profile } = useGlobalContext()

  return (
    <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md w-full z-10 h-20 sticky top-0 max-lg:w-full">
      <div className="flex justify-between items-center w-full m-auto">
        <div className="flex items-center gap-x-2">
          <h1 className="text-xl font-bold text-white-color">Military App</h1>
        </div>
        <div className="flex gap-x-4 text-white-color max-md:hidden">
          <p>User: {profile.username}</p>
        </div>
        <div className="hidden max-md:block text-xl text-white-color ">
          <MenuOutlined onClick={openSidebar} className="w-10 bg-black-coil/20 transition-all duration-300 cursor-pointer hover:bg-black-coil/60 h-10 flex justify-center items-center rounded-full"  />
        </div>
      </div>
    </nav>
  )
}