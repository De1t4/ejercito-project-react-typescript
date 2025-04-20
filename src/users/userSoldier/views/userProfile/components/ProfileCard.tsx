import ResetPassword from "./ResetPassword";
import { ProfileProps } from "../../../models/Profile";
import { SOLDIER } from "@/shared/constants/Roles";

export default function Profile({ profile }: { profile: ProfileProps | null }) {

  return (
    <section className=" max-md:row-span-2 max-lg:row-span-2 max-lg:col-span-3 max-md:p-6 row-span-2   bg-white-color p-10 rounded-lg shadow-lg border border-gray-color  ">
      <div className="flex flex-col  justify-center gap-4">
        <img className=" rounded-md m-auto  shadow-md" src="/soldier.jpg" width={200} height={200} alt="image-soldier" />
        <div className="flex flex-col ">
          <h5 className="h5-style">{profile?.soldier ? profile.soldier.name : "N/A"} {profile?.soldier ? profile.soldier.lastname : "N/A"}</h5>
          <p className="font-medium text-gray-700 text-lg max-md:text-base">{profile?.role ? profile.role : "N/A"}</p>
        </div>
        <div className="flex flex-col gap-1 mt-4 max-md:text-sm">
          <h5 className=" font-medium text-lg">About Me</h5>
          <p><span className="font-medium">Username</span>: {profile?.username ? profile.username : "N/A"}</p>
          {/* <p className=" text-clip whitespace-nowrap"><span className="font-medium">Password</span>: {profile?.password ? profile?.password.slice(1, 30) : "N/A"}</p> */}
          <p><span className="font-medium">Graduation</span>: {profile?.soldier?.graduation ? profile.soldier.graduation : "N/A"}</p>
          <p><span className="font-medium">Id Soldier</span>: N° {profile?.id_user}</p>
        </div>
        {
          profile?.role !== SOLDIER && (
            <ResetPassword />
          )
        }
      </div>
    </section>
  )
}