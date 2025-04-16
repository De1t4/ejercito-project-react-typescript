import { useGlobalContext } from "@/context/globalContext"
import { useEffect, useState } from "react"
import { DashboardData, initialStateDashboard } from "../../models/GeneralData.models"
import { handleDataGeneral } from "../../services/AdminService"
import { StatCard } from "./components/StatCard"
import { getDaysDifferenceFromToday } from "@/utils/utils"
import DonutChart from "./components/DonutChart"

export const UserDashboard = () => {
  const { authTokens } = useGlobalContext()
  const [data, setData] = useState<DashboardData>(initialStateDashboard)

  useEffect(() => {
    const handleDataDashboard = async () => {
      if (!authTokens) return
      const res = await handleDataGeneral(authTokens.token)
      if (res) setData(res)
    }
    handleDataDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="p-6 ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Soldiers" value={data.total_soldier} />
        <StatCard title="Total Services" value={data.total_services} />
        <StatCard title="Completed Services" value={data.services_completed} />
        <StatCard title="Pending Services" value={data.services_pending} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-1">Recent Activity</h2>
          <p className="text-sm text-gray-600 mb-4">Overview of recent user activities and tasks over the past 7 days</p>

          <div className="space-y-4">
            {data.recent_services.slice(1, 6).map((service) => (
              <div key={service.id_services_soldiers} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold">
                  {service.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="">
                    Assigned service <span className="font-base text-black-coil italic">{service.description}</span> <span className="text-blue-600 font-medium">{service.name}</span>
                  </h3>
                  <p className="text-sm text-gray-500">{getDaysDifferenceFromToday(service.days)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-1">Services Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Overview of service status distribution</p>

          <div className="flex items-center justify-center py-4">
            <DonutChart data={[
              { label: "Completed", value: data.services_completed, color: "#4ade80" },
              { label: "Pending", value: data.services_pending, color: "#f97316" },
            ]} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Completed</p>
              <p className="text-xl font-bold text-green-700">{data.services_completed}</p>
              <p className="text-xs text-green-600">{Math.round(data.services_completed / data.total_services * 100 )}%</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-xs text-orange-600 font-medium">Pending</p>
              <p className="text-xl font-bold text-orange-700">{data.services_pending}</p>
              <p className="text-xs text-orange-600">{Math.round(data.services_pending / data.total_services * 100 )}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}