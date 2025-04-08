export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md fixed w-full z-10 h-20">
      <div className="flex justify-between items-center w-[80rem] m-auto">
        <div className="flex items-center gap-x-2">
          <h1 className="text-xl font-bold text-white-color">Military App</h1>
        </div>
        <div className="flex gap-x-4 text-white-color">
          <a href="/profile" className="">Profile</a>
          <a href="/services" className="">Services</a>
          <a href="/logout" className="">Logout</a>
        </div>
      </div>
    </nav>
  )
}