import { VITE_BACK_END_URL } from "@/config/config-env"
import { useGlobalContext } from "@/context/globalContext"
import { Structure } from "@/models/Structure.models"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_BACK = VITE_BACK_END_URL

export default function Home() {
  const [structures, setStructure] = useState<Structure[]>([])
  const { authTokens} = useGlobalContext()
  const fetchStructure =  async() =>{
    if(!authTokens) return
    try{
    const res = await fetch(`${API_BACK}/v1/structure`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.token}`,
      },    
    })
    if (!res.ok) {
      throw new Error("Error fetching structures")
    }
    const data:Structure[] = await res.json()
    setStructure(data)
    }
    catch(err){
      console.error(err)
    }
  }
  //VALIDAR QUE INFORME CUANDO ENVIA MAL EL TIPO PETICION
  useEffect(()=>{
    fetchStructure()
  },[])

  return (
    <section>
      Home
      <article>
        {
          structures.length === 0 && <p>No tienes estructuras crea una!!</p>
        }
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 ">
          {
            structures.map((data)=>(
                <li key={data.id_structure} className=" border border-black">
                  <Link to={`/${data.id_structure}`}>
                    <p>{data.id_structure}</p>
                    <p>{data.name}</p>
                  </Link>
                </li>
            ))
          }
        </ul>
      </article>
    </section>
  )
}