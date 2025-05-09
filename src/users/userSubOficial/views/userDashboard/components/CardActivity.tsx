import { DashboardData } from "@/users/userSubOficial/models/GeneralData.models";
import { getDays, getDaysDifferenceFromToday } from "@/utils/utils";
import { Empty } from "antd";
import { Link } from "react-router-dom";

export default function CardActivity({ data }: { data: DashboardData }) {

  if (data.recent_services.length === 0) {
    return <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 ">
        <h2 className="text-lg font-semibold mb-1">Recent Activity</h2>
        <p className="text-sm text-gray-600 mb-4">Overview of recent user activities and tasks over the past 7 days</p>
        <Empty className="mt-32 text-xl max-lg:mt-2" />
      </div>
    </>
  }
  const filterDataServices = data.recent_services.sort((a, b) => getDays(a.days) - getDays(b.days)).slice(0, 5)

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-1">Recent Activity</h2>
      <p className="text-sm text-gray-600 mb-4">Overview of recent user activities and tasks over the past 7 days</p>
      <div className="space-y-4">
        {filterDataServices.map(({ id_user, name, description, id_services_soldiers, days }) => (
          <Link to={`/soldiers/${id_user}`} key={id_services_soldiers} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="">
                Assigned service <span className="font-base text-black-coil italic">{description}</span> <span className="text-blue-600 font-medium">{name}</span>
              </h3>
              <p className="text-sm text-gray-500">{getDaysDifferenceFromToday(days)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}