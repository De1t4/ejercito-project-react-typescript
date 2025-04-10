import { Control, Controller } from "react-hook-form";
import { Login } from "../models/login";

interface InputLoginProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: "username" | "password";
  error: string | undefined
  control: Control<Login>
}


const InputLogin = ({ label, type, id, placeholder, name, control, error }: InputLoginProps) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm font-roboto font-medium mb-2" htmlFor="username">
        {label}
      </label>
      <Controller name={name} control={control}
        render={({ field }) => (
          <input
            type={type}
            {...field}
            maxLength={100}
            id={id}
            placeholder={placeholder}
            className={`focus:outline-none ${error? "input-login-error" : "input-login "}`}  
          />
        )}
      />
      <p className="h-5 text-red-600 text-sm pl-1 pt-1">{error && error}</p>
    </div>
  );
}

export default InputLogin;
