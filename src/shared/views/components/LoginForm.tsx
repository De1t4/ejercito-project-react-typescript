
import InputLogin from "@/shared/components/InputLogin";
import { initialState, Login, schemaLogin } from "@/shared/models/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalContext } from "@/context/globalContext";
import { useState } from "react";

export const LoginForm = () => {
  const { login } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors } } = useForm<Login>({
    defaultValues: initialState,
    resolver: zodResolver(schemaLogin),
  })

  const onSubmitForm: SubmitHandler<Login> = async (data) => {
    try {
      setIsLoading(true)
      await login(data.username, data.password)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
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
          disabled={isLoading}
          className={`btn-login flex justify-center items-center ${isLoading && 'animate-pulse'}`}
        >
          Sign in
          <div>
            {isLoading && (
              <svg className="animate-spin h-5 w-5 ml-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 17.93V20a8.001 8.001 0 0 1-6.32-13.32l1.42 1.42A6.001 6.001 0 0 0 13 19.93z" fill="currentColor" />
              </svg>
            )}
          </div>
        </button>
        <div className="flex justify-center">
          <p className="text-gray-600 text-sm font-roboto">Don't have an account? <span className="text-primary-color font-bold">Sign up</span></p>
        </div>
      </form>
    </div>
  );
}

