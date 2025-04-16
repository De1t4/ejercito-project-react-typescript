import Sidebar from "@/users/userSubOficial/views/userDashboard/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar >
        <main className="flex-1 px-4 py-5 bg-gray-100 overflow-auto">
          <div className="max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </Sidebar>
    </div>
  )
}