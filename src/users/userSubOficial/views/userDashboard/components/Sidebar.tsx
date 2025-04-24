// Sidebar.jsx
import { useGlobalContext } from "@/context/globalContext";
import NavbarAdmin from "@/shared/components/NavbarAdmin";
import { BarChartOutlined, SettingOutlined, LogoutOutlined, UsergroupAddOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <BarChartOutlined />, href: "/dashboard" },
  { name: "Soldiers", icon: <UsergroupAddOutlined />, href: "/soldiers" },
  { name: "Services", icon: <AppstoreAddOutlined />, href: "/services" },
  { name: "Settings", icon: <SettingOutlined />, href: "/settings" },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { logout } = useGlobalContext()
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(window.innerWidth >= 768);
    };

    handleResize(); // inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div
        className={`
        h-screen bg-black/90 text-white p-4
        flex flex-col justify-between
        transition-all duration-300
        group hover:w-64 w-20
        fixed md:relative z-40
        max-md:top-20
${openMenu ? 'block' : 'max-md:hidden'}

      `}
      >
        {/* Top - Logo */}
        <div>
          <div className="mb-10 text-center">
            <span className="text-xl font-bold">🛡️</span>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-4 p-3 rounded transition-all 
                ${location.pathname === item.href ? "bg-gray-800" : "hover:bg-gray-700"}
              `}
              >
                <span className="text-lg ml-[0.1em]">{item.icon}</span>
                <span className="opacity-0 hidden group-hover:block group-hover:opacity-100 transition-all duration-200 hover">
                  {item.name}
                </span>
              </Link>
            ))}
            <div
              onClick={logout}
              className={`flex items-center gap-4 p-3 rounded transition-all cursor-pointer hover:bg-gray-700 `}>
              <span className="text-lg ml-[0.1em]"><LogoutOutlined /></span>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                Logout
              </span>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarAdmin openSidebar={() => setOpenMenu(!openMenu)} />
        {children}
      </div>
    </>
  );
}
