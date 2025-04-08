import Navbar from "@/shared/components/Navbar";
import Profile from "../components/Profile";
import Structure from "../components/Structure";
import TabServices from "../components/TabServices";
import LayoutContent from "@/shared/layouts/LayoutContent";

export default function UserProfile() {
  return (
    <>
      <Navbar />
      <LayoutContent>
        <div className=" transition-all ease-in-out duration-300 grid max-lg:grid-cols-2 max-lg:grid-rows-4 grid-cols-3 grid-rows-2 max-md:w-full w-[80rem] max-xl:w-full max-xl:gap-5 m-auto gap-10 max-md:grid-cols-1 max-md:grid-rows-2 ma max-md:gap-y-10 max-md:gap-x-0 ">
          <Profile />
          <Structure />
          <TabServices />
        </div>
      </LayoutContent>
    </>
  )
}