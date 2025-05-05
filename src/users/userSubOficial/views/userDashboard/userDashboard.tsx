import { useGlobalContext } from "@/context/globalContext"
import { useEffect, useState } from "react"
import { DashboardData, initialStateDashboard } from "../../models/GeneralData.models"
import { handleDataGeneral } from "../../services/AdminService"
import { StatCard } from "./components/StatCard"
import CardChart from "./components/CardChart"
import CardActivity from "./components/CardActivity"

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
    <div className=" ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Soldiers" value={data.total_soldier} />
        <StatCard title="Total Services" value={data.total_services} />
        <StatCard title="Completed Services" value={data.services_completed} />
        <StatCard title="Pending Services" value={data.services_pending} />
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardActivity data={data} />
        <CardChart data={data} />
      </div>
    </div>
  )
}