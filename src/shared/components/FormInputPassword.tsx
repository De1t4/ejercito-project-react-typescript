import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface InputPasswordProps {
  label: string;
  id: string;
  placeholder: string;
  name: string
  error: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}

export default function FormInputPassword({ label, id, placeholder, name, control, error }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-auto ">
      <label className="label-initial" htmlFor={name}>
        {label}
      </label>
      <Controller name={name} control={control}
        render={({ field }) => (
          <div className="relative flex justify-end items-center  w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              {...field}
              maxLength={100}
              id={id}
              placeholder={placeholder}
              className={`focus:outline-none ${error ? "input-login-error" : "input-login "}`}
            />
            {
              showPassword ?
                <EyeOutlined onClick={() => setShowPassword(!showPassword)} className='absolute -translate-x-4 text-xl cursor-pointer text-black-color/80' />
                : <EyeInvisibleOutlined onClick={() => setShowPassword(!showPassword)} className='absolute -translate-x-4  text-xl cursor-pointer text-black-color/80' />
            }
          </div>
        )}
      />
      <p className=" text-red-600 text-sm  pt-1 h-auto">{error && error}</p>
    </div>
  )
}