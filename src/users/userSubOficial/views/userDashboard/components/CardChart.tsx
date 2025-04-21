import DonutChart from "@/shared/components/DonutChart";
import { DashboardData } from "@/users/userSubOficial/models/GeneralData.models";

export default function CardChart({ data }: { data: DashboardData }) {

  const calculatePercentage = (total: number = 0, search:number = 0) =>{
    if(total == 0 && search == 0){
      return 0
    }
    return Math.round(search/ total * 100)
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-1">Services Distribution</h2>
      <p className="text-sm text-gray-500 mb-4">Overview of service status distribution</p>

      <div className="flex items-center justify-center py-4">
        <DonutChart data={[
          { label: "Completed", value: data.services_completed , color: "#4ade80" },
          { label: "Pending", value: data.services_pending , color: "#f97316" },
        ]} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-xs text-green-600 font-medium">Completed</p>
          <p className="text-xl font-bold text-green-700">{data.services_completed}</p>
          <p className="text-xs text-green-600">{calculatePercentage(data.total_services, data.services_completed)}%</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-xs text-orange-600 font-medium">Pending</p>
          <p className="text-xl font-bold text-orange-700">{data.services_pending}</p>
          <p className="text-xs text-orange-600">{calculatePercentage(data.total_services, data.services_pending)}%</p>
        </div>
      </div>
    </div>
  )
}