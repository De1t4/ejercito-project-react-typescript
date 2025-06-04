import { useGlobalContext } from '@/context/globalContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarHome = () => {
  const [stateToggle, setStateToggle] = useState<boolean>(true)
  const { profile, logout } = useGlobalContext()

  return (
    <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md w-full z-40 h-20 sticky top-0 max-lg:w-full">
      <div className="flex justify-between items-center w-full m-auto">
        <div className="flex items-center justify-center gap-x-2">
          <div className=" max-md:block text-xl text-white-color ">
          </div>
          <Link to={"/home"} className="text-xl font-bold text-white-color">Military App</Link>
        </div>
        <div className="cursor-pointer relative ">
          <div onClick={() => setStateToggle(!stateToggle)} className="hover:bg-gray-600 duration-300 transition-colors shadow-sm shadow-white-color bg-gray-700 gap-x-4 text-white-color w-10   h-10 rounded-full flex justify-center items-center">
            <p className='  select-none font-semibold uppercase text-xl'>{profile.username.charAt(0)}</p>
          </div>
          <ol className={`${stateToggle ? "opacity-0 hidden" : "opacity-100"} absolute  py-2 px-3 -bottom-20 bg-gray-600 w-60 rounded-md right-0 h-16 flex justify-center items-center`}>
            <li onClick={logout} className='hover:bg-gray-500/80 bg-gray-500 text-white-color font-semibold p-2 rounded-md w-full'>Log Out</li>
          </ol>
        </div>

      </div>
    </nav>
  );
}

export default NavbarHome;
