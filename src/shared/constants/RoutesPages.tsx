import { BarChartOutlined, SettingOutlined, UsergroupAddOutlined, AppstoreAddOutlined, ApartmentOutlined, EnvironmentOutlined, SlidersOutlined, AimOutlined } from "@ant-design/icons";


export const itemsSubOficial = [
  { label: 'Dashboard', icon: <BarChartOutlined size={20} />, href: "" },
  { label: 'Soldiers', icon: <UsergroupAddOutlined size={20} />, href: "/soldiers" },
  { label: 'Services', icon: <AppstoreAddOutlined size={20} />, href: "/services" },
  { label: 'Settings', icon: <SettingOutlined size={20} />, href: "/settings" },
];
 
export const itemsOficial = [
  { label: 'Dashboard', icon: <BarChartOutlined />, href: "" },
  { label: 'Soldiers', icon: <UsergroupAddOutlined size={20} />, href: "/soldiers" },
  { label: 'Services', icon: <AppstoreAddOutlined size={20} />, href: "/services" },
  { label: 'Sub Oficials', icon: <ApartmentOutlined />, href: "/sub-oficials" },
  { label: 'Barracks', icon: <EnvironmentOutlined />, href: "/barracks" },
  { label: 'Companies', icon: <AimOutlined />, href: "/companies" },
  { label: 'Bodies', icon: <SlidersOutlined />, href: "/army-bodies" },
  { label: 'Settings', icon: <SettingOutlined size={20} />, href: "/settings" },
];