import Navbar from "@/shared/components/Navbar";
import LayoutContent from "@/shared/layouts/LayoutContent";
import Structure from "./components/Structure";
import TabServices from "./components/TabServices";
import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import { initialStateProfile, ProfileProps } from "../../models/Profile";



export default function UserProfile() {
  const API_URL = import.meta.env.VITE_BACK_END_URL
  const { authTokens } = useGlobalContext()
  const [profile, setProfile] = useState<ProfileProps>(initialStateProfile)

  const fetchSoldierData = async () => {
    try {
      const res = await fetch(`${API_URL}/v1/profile/find`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.token}`,
        },
      })
      if (!res.ok) {
        throw new Error("Error fetching soldier data")
      }
      const data: ProfileProps = await res.json()
      setProfile(data)
    } catch (err) {
      console.error("Error fetching soldier data", err)
    }
  }

  useEffect(() => {
    fetchSoldierData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />
      <LayoutContent>
        <div className=" transition-all ease-in-out duration-300 grid max-lg:grid-cols-2 max-lg:grid-rows-4 grid-cols-3 grid-rows-2 max-md:w-full w-[80rem] max-xl:w-full max-xl:gap-5 m-auto gap-10 max-md:grid-cols-1 max-md:grid-rows-2 ma max-md:gap-y-10 max-md:gap-x-0 ">
          <Profile profile={profile} />
          <Structure
            company={profile?.soldier?.company}
            barrack={profile?.soldier?.barrack}
            armyBody={profile?.soldier?.body}
          />
          <TabServices services={profile?.services} />
        </div>
      </LayoutContent>
    </>
  )
}