import { useGlobalContext } from "@/context/globalContext"
import { OFICIAL, SOLDIER, SUB_OFICIAL } from "@/shared/constants/Roles"
import LayoutContent from "@/shared/layouts/LayoutContent"
import LayoutOficial from "@/shared/layouts/LayoutOficial"
import LayoutSubOficial from "@/shared/layouts/LayoutSubOficial"
import { Outlet } from "react-router-dom"

export default function ConfigLayout() {
  const { getUserRole } = useGlobalContext();

  const userRole = getUserRole()?.toUpperCase();

  switch (userRole) {
    case OFICIAL:
      return <LayoutOficial />
    case SUB_OFICIAL:
      return <LayoutSubOficial />
    case SOLDIER:
      return <LayoutContent ><Outlet /></LayoutContent>
  }
}