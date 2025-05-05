import ResetPassword from "./ResetPassword";
import { ProfileProps } from "../../../models/Profile";
import { SOLDIER } from "@/shared/constants/Roles";
import { useGlobalContext } from "@/context/globalContext";

export default function Profile({ profileSoldier }: { profileSoldier: ProfileProps | null }) {
  const { profile } = useGlobalContext()
  return (
    <section className=" max-md:row-span-2 max-lg:row-span-2 max-lg:col-span-3 max-md:p-6 row-span-2   bg-white-color p-10 rounded-lg shadow-lg border border-gray-color  ">
      <div className="flex flex-col  justify-center gap-4">
        <img className=" rounded-md m-auto  shadow-md" src="/soldier.jpg" width={200} height={200} alt="image-soldier" />
        <div className="flex flex-col ">
          <h5 className="h5-style">{profileSoldier?.soldier ? profileSoldier.soldier.name : "N/A"} {profileSoldier?.soldier ? profileSoldier.soldier.lastname : "N/A"}</h5>
          <p className="font-medium text-gray-700 text-lg max-md:text-base">{profileSoldier?.role ? profileSoldier.role : "N/A"}</p>
        </div>
        <div className="flex flex-col gap-1 mt-4 max-md:text-sm">
          <h5 className=" font-medium text-lg">About Me</h5>
          <p><span className="font-medium">Username</span>: {profileSoldier?.username ? profileSoldier.username : "N/A"}</p>
          <p><span className="font-medium">Graduation</span>: {profileSoldier?.soldier?.graduation ? profileSoldier.soldier.graduation : "N/A"}</p>
          <p><span className="font-medium">Id Soldier</span>: N° {profileSoldier?.id_user}</p>
        </div>
        {
          profile.role === SOLDIER && (
            <ResetPassword />
          )
        }
      </div>
    </section>
  )
}