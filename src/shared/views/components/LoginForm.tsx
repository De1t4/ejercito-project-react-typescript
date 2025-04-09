
import InputLogin from "@/shared/components/InputLogin";
import { initialState, Login, schemaLogin } from "@/shared/models/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalContext } from "@/context/globalContext";

export const LoginForm = () => {
  const {login } = useGlobalContext();
  const { control, handleSubmit, formState: { errors } } = useForm<Login>({
    defaultValues: initialState,
    resolver: zodResolver(schemaLogin),
  })

  const onSubmitForm: SubmitHandler<Login> = (data) => {
    login(data.username, data.password)
  }

  return (
    <div className="h-full justify-center flex items-center flex-col w-full gap-7">
      <div className="  justify-start items-start text-left flex-col font-sans">
        <h1 className="text-3xl font-bold mb-2 text-left  ">Welcome Back</h1>
        <p className=" text-black-color/90 font-medium font-sans">You've successfully logged into the Military System. We wish you a productive day.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4 w-full">
        <InputLogin
          type="text"
          id="username"
          placeholder="Enter your username"
          label="Username"
          name="username"
          error={errors.username?.message}
          control={control}
        />
        <InputLogin
          type="password"
          id="password"
          placeholder="Enter your password"
          label="Password"
          error={errors.password?.message}
          name="password"
          control={control}
        />
        <div className=" flex justify-end">
          <p className=" font-roboto text-[#1E4AE9] text-sm font-medium hover:cursor-pointer">Forgot Password?</p>
        </div>
        <button
          type="submit"
          className="btn-login"
        >
          Sign in
        </button>
        <div className="flex justify-center">
          <p className="text-gray-600 text-sm font-roboto">Don't have an account? <span className="text-primary-color font-bold">Sign up</span></p>
        </div>
      </form>
    </div>
  );
}

