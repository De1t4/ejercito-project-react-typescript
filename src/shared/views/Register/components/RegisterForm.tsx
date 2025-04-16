import { registerService } from "@/services/authService";
import FormInput from "@/shared/components/FormInput";
import FormInputPassword from "@/shared/components/FormInputPassword";
import FormSelect from "@/shared/components/FormSelect";
import { optionsRole } from "@/shared/constants/Roles";
import { FormRegister, intiialStateRegister, schemanRegister } from "@/shared/models/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm<FormRegister>({
    defaultValues: intiialStateRegister,
    resolver: zodResolver(schemanRegister)
  })

  const onSubmitRegister: SubmitHandler<FormRegister> = async (data) => {
    const res = await registerService(data)
    if (!res) navigate("/login")
    if (res === 'BAD_REQUEST') {
      alert("EL USUARIO YA EXISTE")
    }
  }

  return (
    <div className="h-full justify-center flex items-center flex-col w-full gap-3">
      <h1 className="text-3xl font-bold mb-2 text-left  ">Register Now</h1>
      <form onSubmit={handleSubmit(onSubmitRegister)} className="w-full flex flex-col gap-4">
        <FormInput
          type="text"
          id="username"
          placeholder="Enter your username"
          label="Username"
          name="username"
          error={errors.username?.message}
          control={control}
        />
        <FormInputPassword
          id="password"
          placeholder="Enter your password"
          label="Password"
          name="password"
          error={errors.password?.message}
          control={control}
        />
        <FormInputPassword
          id="confirmPassword"
          placeholder="Confirm your password"
          label="Confirm Password"
          name="confirmPassword"
          error={errors.confirmPassword?.message}
          control={control}
        />
        <FormSelect
          control={control}
          placeholder={"Select Options"}
          error={errors.role?.message}
          id="role"
          name="role"
          label="Select Role"
          options={optionsRole}
        />
        <div className="flex w-full">
          <button className="btn-login w-full" type="submit">Create Account</button>
        </div>
        <div className="flex justify-center">
          <Link to="/login" className="text-gray-600 text-sm font-roboto">Do you have an account? <span className="text-primary-color font-bold">Log In</span></Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
