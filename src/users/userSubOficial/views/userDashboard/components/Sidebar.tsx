// Sidebar.jsx
import { useGlobalContext } from "@/context/globalContext";
import NavbarAdmin from "@/shared/components/NavbarAdmin";
import { OFICIAL } from "@/shared/constants/Roles";
import { BarChartOutlined, SettingOutlined, LogoutOutlined, UsergroupAddOutlined, AppstoreAddOutlined, ApartmentOutlined, EnvironmentOutlined, SlidersOutlined, AimOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { logout, profile } = useGlobalContext()
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const itemsSubOficial: MenuItem[] = [
    { key: '1', icon: <Link className="flex justify-center items-center" to={"/dashboard"}><BarChartOutlined /></Link>, label: 'Dashboard' },
    { key: '2', icon: <Link className="flex justify-center items-center" to={"/soldiers"}> <UsergroupAddOutlined /></Link>, label: 'Soldiers' },
    {
      key: '3', icon: <Link to={"/services"}>
        <AppstoreAddOutlined />
      </Link>, label: 'Services'
    },
    {
      key: '4', icon: <Link to={"/settings"}>
        <SettingOutlined />
      </Link>, label: 'Settings'
    },
    {
      key: '5', icon: <LogoutOutlined onClick={logout} />
      , label: 'Log Out'
    },
  ];

  const itemsOficial: MenuItem[] = [
    { key: '1', icon: <Link className="flex justify-center items-center" to={"/dashboard"}><BarChartOutlined /></Link>, label: 'Dashboard' },
    { key: '2', icon: <Link className="flex justify-center items-center" to={"/soldiers"}> <UsergroupAddOutlined /></Link>, label: 'Soldiers' },
    {
      key: '3', icon: <Link to={"/services"}>
        <AppstoreAddOutlined />
      </Link>, label: 'Services'
    },

    {
      key: '5',
      icon: (
        <Link className="flex justify-center items-center" to="/sub-oficials">
          <ApartmentOutlined />
        </Link>
      ),
      label: 'Sub Oficials'
    },
    {
      key: '6',
      icon: (
        <Link className="flex justify-center items-center" to="/barracks">
          <EnvironmentOutlined />
        </Link>
      ),
      label: 'Barracks'
    },
    {
      key: '7',
      icon: (
        <Link className="flex justify-center items-center" to="/companies">
          <AimOutlined />
        </Link>
      ),
      label: 'Companies'
    },
    {
      key: '8',
      icon: (
        <Link className="flex justify-center items-center" to="/army-bodies">
          <SlidersOutlined />
        </Link>
      ),
      label: 'Bodies'
    },
    {
      key: '4', icon: <Link to={"/settings"}>
        <SettingOutlined />
      </Link>, label: 'Settings'
    },
    {
      key: '9', icon: <LogoutOutlined onClick={logout} />
      , label: 'Log Out'
    },
  ];


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
      <div  className="bg-transparent absolute z-20 top-20">
        {openMenu && (
          <>
            <Button className="mb-3 w-20" type="primary" onClick={toggleCollapsed} >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
              className=" rounded-lg"
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={profile.role === OFICIAL ? itemsOficial : itemsSubOficial}
            />
          </>
        )

        }
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarAdmin openSidebar={() => setOpenMenu(!openMenu)} />
        {children}
      </div>
    </>
  );
}
