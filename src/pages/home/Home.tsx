import { VITE_BACK_END_URL } from "@/config/config-env"
import { useGlobalContext } from "@/context/globalContext"
import { Structure } from "@/models/Structure.models"
import { OFICIAL } from "@/shared/constants/Roles"
import { AppstoreAddOutlined, BuildOutlined, EnvironmentOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import { Empty } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_BACK = VITE_BACK_END_URL

export default function Home() {
  const [structures, setStructure] = useState<Structure[]>([])
  const { authTokens, profile } = useGlobalContext()
  const fetchStructure = async () => {
    if (!authTokens) return
    try {
      const res = await fetch(`${API_BACK}/v1/structure`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.token}`,
        },
      })
      if (!res.ok) {
        throw new Error("Error fetching structures")
      }
      const data: Structure[] = await res.json()
      setStructure(data)
    }
    catch (err) {
      console.error(err)
    }
  }
  //VALIDAR QUE INFORME CUANDO ENVIA MAL EL TIPO PETICION
  useEffect(() => {
    fetchStructure()
  }, [])

  return (
    <>
      <nav className="flex justify-between items-center bg-primary-color p-4 shadow-md w-full z-40 h-20 sticky top-0 max-lg:w-full">
        <div className="flex justify-between items-center w-full m-auto">
          <div className="flex items-center justify-center gap-x-2">
            <div className=" max-md:block text-xl text-white-color ">
            </div>
            <Link to={"/home"} className="text-xl font-bold text-white-color">Military App</Link>
          </div>
          <div className="flex gap-x-4 text-white-color max-md:hidden">
            <p>User: <span className=" font-semibold">{authTokens?.username}</span></p>
          </div>

        </div>
      </nav>
      <main className="py-10 px-16">
        <section className="max-w-5xl mx-auto border-b pb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Your Structures</h1>
          <ul className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            {
              profile.role === OFICIAL &&
              <li key={"create-new-structure"} className="bg-gray-700 h-full hover:bg-gray-800/90 rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                <div className="p-8 flex-col text-center flex justify-center items-center">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    styles={{ image: { height: 60 } }}
                    description
                    className="max-md:hidden"
                  ></Empty>
                  <h3 className="text-white text-xl font-medium"><AppstoreAddOutlined className="max-md:block hidden" />Create a Structure Project</h3>
                </div>
              </li>
            }

            {
              structures.map((data) => (
                <Link key={data.id_structure} to={`/structure/${data.id_structure}`} className="bg-primary-color/90 hover:bg-primary-color/80 h-full  rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <li className=" p-8">
                    <h3 className="text-white  font-medium mb-2 text-2xl">{data.name}</h3>
                    <p className="text-gray-400 text-sm lowercase">{data.name}</p>
                  </li>
                </Link>
              ))
            }
          </ul>
        </section>
        <section className="mt-6 max-w-5xl mx-auto">
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
                <p className="text-sm text-gray-600">Plan tactical operations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}