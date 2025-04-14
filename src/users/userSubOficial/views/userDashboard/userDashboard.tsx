import Navbar from "@/shared/components/Navbar";
import LayoutContent from "@/shared/layouts/LayoutContent";
import { MenuOutlined } from "@ant-design/icons";

export default function UserDashboard() {
  return (
    <>
      <Navbar />
      <LayoutContent>
        <div
          className="transition-all  ease-in-out duration-300  max-md:w-full w-[80rem] max-xl:w-full max-xl:gap-5 m-auto "
        >
          <aside className="max-md:row-span-2 max-lg:row-span-2 max-lg:col-span-3 max-md:p-6 row-span-2   bg-white-color p-10 rounded-lg shadow-lg border border-gray-color"> 
          <div className="flex items-center gap-2">
            <MenuOutlined className="text-xl"/>
              <h5>Menu</h5>
          </div>
            <ol className=" flex  flex-col gap-3 my-2">
              <li className="li-menu">Dashboard</li>
              <li className="li-menu">Soldiers</li>
              <li className="li-menu">Services</li>
              <li className="li-menu">Settings</li>
              <li className="li-menu">Log Out</li>
            </ol>
          </aside>

        </div>
      </LayoutContent>
    </>
  )
}