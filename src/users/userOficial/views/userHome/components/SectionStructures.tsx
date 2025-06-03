import { VITE_BACK_END_URL } from "@/config/config-env"
import { useGlobalContext } from "@/context/globalContext"
import { Structure } from "@/models/Structure.models"
import { OFICIAL } from "@/shared/constants/Roles"
import { AppstoreAddOutlined } from "@ant-design/icons"
import { Empty } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_BACK = VITE_BACK_END_URL

export default function SectionStructures({ handleOpenPanel }: { handleOpenPanel: () => void }) {
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
    <section className=" mx-auto border-b border-gray-400 pb-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Your Structures</h1>
      <ul className="grid  grid-cols-1 md:grid-cols-3 gap-6">
        {
          profile.role === OFICIAL &&
          <li onClick={handleOpenPanel} key={"create-new-structure"} className="bg-gray-700 h-40 hover:bg-gray-800/90 rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
            <div className="p-8 h-full flex-col text-center flex justify-center items-center">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                styles={{ image: { height: 60 } }}
                description
                className="max-md:hidden"
              ></Empty>
              <h3 className="text-white text-xl font-medium"><AppstoreAddOutlined className="max-md:block hidden" />Create a Structure</h3>
            </div>
          </li>
        }

        {
          structures.map((data) => (
            <Link key={data.id_structure} to={`/structure/${data.id_structure}`} className="bg-primary-color/90 hover:bg-primary-color/80 h-40  rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
              <li className=" p-8">
                <h3 className="text-white  font-medium mb-2 text-2xl">{data.name}</h3>
                <p className="text-gray-400 text-sm lowercase">{data.name}</p>
              </li>
            </Link>
          ))
        }
      </ul>
    </section>
  )
}