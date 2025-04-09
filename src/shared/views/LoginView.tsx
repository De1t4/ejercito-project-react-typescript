import LoginForm from "./components/LoginForm";

export default function LoginView() {
  return (
    <div className=" flex justify-center items-center m-auto h-screen bg-[#F7FBFF]">
      <div className="flex w-[60rem] max-lg:w-full m-auto justify-center items-center gap-5 max-md:w-full max-md:flex-col-reverse">
        <div className="bg-white shadow-lg rounded px-8 pt-6 max-md:w-full pb-8 w-[35rem] h-[35rem] flex flex-col justify-center items-center ">
          <LoginForm />
        </div>
        <div className="mt-4 max-md:flex max-md:justify-center px-8 max-md:items-center w-[35rem] h-[35rem] max-md:w-full max-md:h-1/2 rounded-2xl overflow-hidden hidden">
          <img src="soldier-login-mobile.jpg" alt="" className="rounded-2xl" />
        </div>
        <div className="max-md:hidden w-[30rem]  h-[35rem] max-lg:w-[27rem] max-md:w-full rounded-lg overflow-hidden shadow-lg">
          <img src="soldier-login.jpg" alt="" className="w-full overflow-hidden h-full object-contain object-center" />
        </div>
      </div>
    </div>
  )
}