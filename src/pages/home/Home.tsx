import { VITE_BACK_END_URL } from "@/config/config-env"
import { useGlobalContext } from "@/context/globalContext"
import { Structure } from "@/models/Structure.models"
import { AppstoreAddOutlined } from "@ant-design/icons"
import { Empty } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_BACK = VITE_BACK_END_URL

export default function Home() {
  const [structures, setStructure] = useState<Structure[]>([])
  const { authTokens } = useGlobalContext()
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
      <main className="p-4">
        <h1 className="style-title mb-4">Your Structures</h1>
        <section>
          {
            structures.length === 0 && <p>No tienes estructuras crea una!!</p>
          }
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(350px,2fr))] gap-4 ">
            <li key={"create-new-structure"} className="bg-gray-800 h-full hover:bg-gray-800/90 rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
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
      </main>
    </>
  )
}