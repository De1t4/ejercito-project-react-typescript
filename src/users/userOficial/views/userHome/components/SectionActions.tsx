import { BuildOutlined, EnvironmentOutlined, UsergroupAddOutlined } from "@ant-design/icons";

export default function SectionActions() {
  return (
    <section className="mt-6  mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" hover:shadow-xl transition-shadow cursor-pointer group border shadow-md rounded-md">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <BuildOutlined className=" text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Base Layout</h4>
            <p className="text-sm text-gray-600">Design military base structures</p>
          </div>
        </div>
        <div className=" hover:shadow-xl transition-shadow cursor-pointer group border shadow-md rounded-md">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <UsergroupAddOutlined className=" text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Personnel</h4>
            <p className="text-sm text-gray-600">Manage military personnel</p>
          </div>
        </div>
        <div className=" hover:shadow-xl transition-shadow cursor-pointer group border shadow-md rounded-md">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <EnvironmentOutlined className=" text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Operations</h4>
            <p className="text-sm text-gray-700 font-medium">Plan tactical operations</p>
          </div>
        </div>
      </div>
    </section>
  )
}