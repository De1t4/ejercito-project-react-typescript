import { useGlobalContext } from "@/context/globalContext";
import NavbarAdmin from "./NavbarAdmin";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { itemsSubOficial } from "../constants/RoutesPages";
import { LogoutOutlined } from "@ant-design/icons";

export default function SidebarSub({ children }: { children: React.ReactNode }) {
  const { logout } = useGlobalContext()
  const [collapsed, setCollapsed] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(true)
  const { idStructure } = useParams()


  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 768);
      setCollapsed(window.innerWidth >= 768)
    };

    handleResize(); // inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen w-full absolute">
        {/* Navbar fijo arriba */}
        <NavbarAdmin openSidebar={() => setCollapsed(!collapsed)} />
        {/* Contenedor con sidebar + contenido */}
        <div className="flex flex-1 overflow-hidden  w-full">
          {/* Sidebar lateral */}
          {
            !openSidebar ?
              (<>
                {
                  collapsed && (
                    <>
                      <div
                        className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                        onClick={() => setCollapsed(false)}
                      />
                      <aside className={`bg-primary-color absolute top-20 h-screen overflow-y-hidden text-white transition-all duration-300 w-64 flex flex-col z-20`}>
                        <div className={` px-4 flex-1 py-4 space-y-6 text-sm overflow-y-auto`}>
                          <nav className={`space-y-4 w-full`}>
                            {itemsSubOficial.map(({ label, icon, href }) => (
                              <Link to={`/structure/${idStructure}${href}`} key={label} className={`flex items-center space-x-3 p-2 rounded hover:bg-black-coil/50 shadow-lg bg-black-coil/40 cursor-pointer `}>
                                <span >{icon}</span>
                                <span>{label}</span>
                              </Link>
                            ))}
                            <div onClick={logout} key={"logout"} className={`flex items-center space-x-3 p-2 rounded hover:bg-black-coil/50 shadow-lg bg-black-coil/40 cursor-pointer w-full `}>
                              <span className={` text-xl}`} ><LogoutOutlined /></span>
                              <span>Log Out</span>
                            </div>
                          </nav>
                        </div>
                      </aside>
                    </>
                  )
                }
              </>)
              : (<>
                <aside className={`bg-primary-color text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
                  <div className={`${collapsed ? 'px-2' : 'px-4'} flex-1 py-4 space-y-6 text-sm overflow-y-auto`}>
                    <nav className={`space-y-4 ${collapsed && 'flex flex-col justify-center items-center'}`}>
                      {itemsSubOficial.map(({ label, icon, href }) => (
                        <Link to={`/structure/${idStructure}${href}`} key={label} className={`flex items-center space-x-3 p-2 rounded hover:bg-black-coil/50 shadow-lg bg-black-coil/40 cursor-pointer ${collapsed ? 'w-14 h-14 flex-col justify-center items-center' : ''}`}>
                          <span className={`${collapsed && 'text-xl'}`}>{icon}</span>
                          {!collapsed && <span>{label}</span>}
                        </Link>
                      ))}
                      <div onClick={logout} key={"logout"} className={`flex items-center space-x-3 p-2 rounded hover:bg-black-coil/50 shadow-lg bg-black-coil/40 cursor-pointer ${collapsed ? 'w-14 h-14 flex-col justify-center items-center' : ''} `}>
                        <span className={`${collapsed && 'text-xl'}`} ><LogoutOutlined /></span>
                        {!collapsed && <span>Log Out</span>}
                      </div>
                    </nav>
                  </div>
                </aside>
              </>)
          }

          {/* Contenido principal */}
          <main className="flex-1 overflow-auto bg-gray-100 p-4">
            {children}
          </main>
        </div>
      </div >
    </>
  );
}