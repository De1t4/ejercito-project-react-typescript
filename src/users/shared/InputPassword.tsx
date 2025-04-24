import { FormValidation } from '@/users/userSoldier/models/Password.models';
import { Control, Controller } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface InputResetPasswordProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: "newPassword" | "currentPassword" | "confirmPassword";
  error: string | undefined
  control: Control<FormValidation>
  styleInput?: "input-style-reset" | "input-style-generic"
}

const InputPassword = ({ label, type = 'password', id, placeholder, control, error, name, styleInput = "input-style-reset" }: InputResetPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`w-full flex flex-col gap-1 `}>
      <label className={`${error ? 'text-red-600' : 'text-black-color'} `} htmlFor={name}>
        {label}
      </label>
      <Controller name={name} control={control}
        render={({ field }) => (
          <div className="relative flex justify-end items-center  w-full">
            <input
              type={showPassword ? 'text' : type}
              {...field}
              maxLength={100}
              id={id}
              placeholder={placeholder}
              className={`focus:outline-none ${error && "input-login-error"} ${styleInput}`}
            />
            {
              showPassword ?
                <EyeOutlined onClick={() => setShowPassword(!showPassword)} className='absolute -translate-x-4 text-xl cursor-pointer text-black-color' />
                : <EyeInvisibleOutlined onClick={() => setShowPassword(!showPassword)} className='absolute -translate-x-4  text-xl cursor-pointer text-black-color' />
            }

          </div>
        )}
      />
      <p className="h-5 text-red-600 text-sm">{error && error}</p>
    </div>
  );
}

export default InputPassword;

