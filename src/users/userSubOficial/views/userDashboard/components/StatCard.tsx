import { Link } from "react-router-dom";

export function StatCard({ title, value, href }: { title: string; value: number, href: string }) {
  return (
    <Link to={href} className="bg-white hover:bg-white/40 cursor-pointer transition-all duration-300 rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className={`h-2 bg-gray-700`}></div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">{title}</h2>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
