import { useGlobalContext } from "@/context/globalContext"
import { initialStateProfile, ProfileProps } from "@/users/userSoldier/models/Profile"
import Structure from "@/users/userSoldier/views/userProfile/components/ProfileStructure"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserProfile } from "../../services/UserService"
import Profile from "@/users/userSoldier/views/userProfile/components/ProfileCard"
import TabServices from "@/users/userSoldier/components/Tab/TabServices"


export default function UserSoldierProfile() {
  const [profile, setProfile] = useState<ProfileProps>(initialStateProfile)
  const { id } = useParams()
  const { authTokens } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDataUserById = async () => {
      if (!authTokens) return
      if (!id) return
      const res = await getUserProfile(authTokens.token, Number(id));
      if (res == "NOT_FOUND") {
        alert("The user was not found")
        navigate("/soldiers")
        return
      }
      if (res == "BAD_REQUEST") {
        alert("The parameter in sent is incorrect")
        navigate("/soldiers")
        return
      }
      if (res) setProfile(res)

    }

    fetchDataUserById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  return (
    <>
      <div className="transition-all ease-in-out duration-300 grid max-lg:grid-cols-2 max-lg:grid-rows-4 grid-cols-3 grid-rows-2 max-md:w-full w-[78rem] max-xl:w-full max-xl:gap-5 m-auto gap-10 max-md:grid-cols-1 max-md:grid-rows-2 max-md:gap-y-10 max-md:gap-x-0">
        <Profile profileSoldier={profile} />
        <Structure
          company={profile?.soldier?.company}
          barrack={profile?.soldier?.barrack}
          armyBody={profile?.soldier?.body}
        />
        <TabServices
          handleScreenView={(view) => view}
          profileSoldier={profile}
        />
      </div>
    </>
  )
}