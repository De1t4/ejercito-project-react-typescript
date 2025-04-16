import { useGlobalContext } from "@/context/globalContext"

export default function Navbar() {
  const { logout } = useGlobalContext()

  return (
    <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md w-full z-10 h-20 sticky top-0 max-lg:w-full">
      <div className="flex justify-between items-center w-[80rem] m-auto">
        <div className="flex items-center gap-x-2">
          <h1 className="text-xl font-bold text-white-color">Military App</h1>
        </div>
        <div className="flex gap-x-4 text-white-color">
          <a href="/profile" className="">Profile</a>
          <a href="/services" className="">Services</a>
          <p onClick={logout} className=" cursor-pointer">Logout</p>
        </div>
      </div>
    </nav>
  )
}