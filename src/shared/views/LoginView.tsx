import { LoginForm } from "./components/LoginForm";

export default function LoginView() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7FBFF] px-4">
      <div className="flex flex-col md:flex-row  max-md:flex-col-reverse items-center justify-center w-full max-w-[60rem] gap-5">

        {/* Formulario */}
        <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-full md:w-[35rem] h-[35rem] flex justify-center items-center">
          <LoginForm />
        </div>

        {/* Imagen responsiva */}
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