import { Control, Controller } from "react-hook-form";

interface InputLoginProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: string
  error: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}


const InputLogin = ({ label, type, id, placeholder, name, control, error }: InputLoginProps) => {
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
            maxLength={100}
            id={id}
            placeholder={placeholder}
            className={`focus:outline-none ${error? "input-login-error" : "input-login "}`}  
          />
        )}
      />
      <p className=" text-red-600 text-sm  pt-1 h-auto">{error && error}</p>
    </div>
  );
}

export default InputLogin;
