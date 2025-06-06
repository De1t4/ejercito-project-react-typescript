import { useGlobalContext } from "@/context/globalContext"
import { OFICIAL } from "@/shared/constants/Roles"
import { AppstoreAddOutlined } from "@ant-design/icons"
import { Empty, Spin } from "antd"
import { FC, Suspense } from "react"
import ListStructures from "./ListStructures"
import { fetchStructure } from "@/users/userOficial/services/StructureService"

interface PropsHome {
  handleOpenPanel: () => void
}

export const SectionStructure: FC<PropsHome> = ({ handleOpenPanel }) => {
  const { profile, authTokens } = useGlobalContext()
  if (!authTokens) return
  return (
    <section className=" mx-auto border-b border-gray-400 pb-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Your Structures</h1>
      <ul className="grid  grid-cols-1 md:grid-cols-3 gap-6">
        {
          profile.role === OFICIAL &&
          <li onClick={handleOpenPanel} key={"create-new-structure"} className="bg-gray-700 h-40 hover:bg-gray-800/90 rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer shadow-md">
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

        <Suspense fallback={<div className="flex justify-center items-center"><p>Loading...  </p> <Spin /> </div>}>
          <ListStructures
            getStructures={fetchStructure(authTokens.token)}
          />
        </Suspense>
      </ul>
    </section>
  )
}