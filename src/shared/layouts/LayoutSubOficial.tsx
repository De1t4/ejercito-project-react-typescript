import { Outlet } from "react-router-dom";
import SidebarSub from "../components/SidebarSub";

export default function LayoutSubOficial() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarSub >
        <main className="flex-1 px-4 py-5 max-md:px-0 max-md:py-2 bg-gray-100 overflow-auto">
          <div className="max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </SidebarSub>
    </div>
  )
}