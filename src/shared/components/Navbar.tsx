import { useGlobalContext } from "@/context/globalContext"
import { Link } from "react-router-dom"

export default function Navbar() {
  const { logout } = useGlobalContext()

  return (
    <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md w-full z-10 h-20 sticky top-0 max-lg:w-full">
      <div className="flex justify-between items-center w-[80rem] m-auto">
        <div className="flex items-center gap-x-2">
          <h1 className="text-xl font-bold text-white-color">Military App</h1>
        </div>
        <div className="flex gap-x-4 text-white-color  font-semibold">
          <Link to="/profile" className="">Profile</Link>
          <p onClick={logout} className=" cursor-pointer">Logout</p>
        </div>
      </div>
    </nav>
  )
}