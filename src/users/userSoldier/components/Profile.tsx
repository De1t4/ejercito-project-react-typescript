import ResetPassword from "./ResetPassword";

export default function Profile() {

  return (
    <section className=" max-md:row-span-2 max-lg:row-span-2 max-lg:col-span-3 max-md:p-6 row-span-2   bg-white-color p-10 rounded-lg shadow-lg border border-gray-color  ">
      <div className="flex flex-col  justify-center gap-4">
        <img className=" rounded-md m-auto  shadow-md" src="soldier.jpg" width={200} height={200} alt="image-soldier" />
        <div className="flex flex-col ">
          <h5 className="h5-style">Martin Gonzales</h5>
          <p className="font-medium text-gray-700 text-lg max-md:text-base">Soldier</p>
        </div>
        <div className="flex flex-col gap-1 mt-4 max-md:text-sm">
          <h5 className=" font-medium text-lg">About Me</h5>
          <p>Username: testusername</p>
          <p>Password: ***********</p>
          <p>Graduation: 2024-02-02</p>
          <p>Id Soldier: N°2323</p>
        </div>
        <ResetPassword />
      </div>
    </section>
  )
}