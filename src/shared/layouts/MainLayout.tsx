import Sidebar from "@/shared/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar >
        <main className="flex-1  max-md:px-0 max-md:py-2 bg-gray-100 overflow-auto">
          <div className="max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </Sidebar>
    </div>
  )
}