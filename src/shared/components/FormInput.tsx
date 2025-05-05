import { HTMLInputTypeAttribute } from "react";
import { Control, Controller } from "react-hook-form";

interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  name: string
  error: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  disabled?: boolean
  maxLength?: number
}


const FormInput = ({maxLength = 100, disabled = false, label, type, id, placeholder, name, control, error }: InputProps) => {
  return (
    <div className="w-full h-auto ">
      <label className="label-initial" htmlFor={name}>
        {label}
      </label>
      <Controller name={name} control={control}
        render={({ field }) => (
          <input
            type={type}
            {...field}
            maxLength={maxLength}
            disabled={disabled}
            id={id}
            placeholder={placeholder}
            className={`focus:outline-none  ${error ? "input-login-error" : "input-login "}`}
          />
        )}
      />
      <p className=" text-red-600 text-sm  pt-1 h-auto">{error && error}</p>
    </div>
  );
}

export default FormInput;
