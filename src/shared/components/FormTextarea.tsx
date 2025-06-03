import { Control, Controller } from "react-hook-form";

interface TextProps {
  label: string;
  id: string;
  placeholder: string;
  name: string
  error: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  disabled?: boolean
  maxLength?: number

}


export const FormTextarea = ({ maxLength = 255, disabled = false, label, id, placeholder, name, control, error }: TextProps) => {

  return (
    <div className="w-full h-auto ">
      <label className="label-initial" htmlFor={name}>
        {label}
      </label>
      <Controller name={name} control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              maxLength={maxLength}
              disabled={disabled}
              id={id}
              placeholder={placeholder}
              className={`focus:outline-none   ${error ? "textarea-login-error" : "textarea-login "}`}
            />
            <div className=" flex justify-between">
              <p className=" text-red-600 text-sm h-auto">{error && error}</p>
              <p className=" text-gray-700 text-sm ">{`${String(field.value).length}/${maxLength}`}</p>
            </div>
          </>
        )}
      />
    </div>
  )
}