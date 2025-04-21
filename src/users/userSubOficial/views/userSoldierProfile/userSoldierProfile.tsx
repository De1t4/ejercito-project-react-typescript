import { useGlobalContext } from "@/context/globalContext"
import { initialStateProfile, ProfileProps } from "@/users/userSoldier/models/Profile"
import Structure from "@/users/userSoldier/views/userProfile/components/ProfileStructure"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfile } from "../../services/UserService"
import Profile from "@/users/userSoldier/views/userProfile/components/ProfileCard"
import TabServices from "@/users/userSoldier/components/Tab/TabServices"
import LayoutContent from "@/shared/layouts/LayoutContent"

type typeScreen = 'primary' | 'secondary'

export default function UserSoldierProfile() {
  const [profile, setProfile] = useState<ProfileProps>(initialStateProfile)
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setScreen] = useState<typeScreen>('primary')
  const { authTokens } = useGlobalContext()


  useEffect(() => {
    const fetchDataUserById = async () => {
      if (!authTokens) return
      if (!id) return
      const res = await getUserProfile(authTokens.token, Number(id));
      if (res) setProfile(res)
    }

    fetchDataUserById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  return (
    <>
      <LayoutContent>
        <div className="transition-all ease-in-out duration-300 grid max-lg:grid-cols-2 max-lg:grid-rows-4 grid-cols-3 grid-rows-2 max-md:w-full w-[78rem] max-xl:w-full max-xl:gap-5 m-auto gap-10 max-md:grid-cols-1 max-md:grid-rows-2 max-md:gap-y-10 max-md:gap-x-0">
          <Profile profileSoldier={profile} />
          <Structure
            company={profile?.soldier?.company}
            barrack={profile?.soldier?.barrack}
            armyBody={profile?.soldier?.body}
          />
          <TabServices
            handleScreenView={(view) => setScreen(view)}
            profileSoldier={profile}
          />
        </div>
      </LayoutContent >
    </>
  )
}