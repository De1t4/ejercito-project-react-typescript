import { Control, Controller } from "react-hook-form";

export interface OptionsProps {
  title: string,
  value: string
}

interface SelectProps {
  label: string;
  id: string;
  placeholder: string;
  name: string
  error: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  options: OptionsProps[]

}
export default function FormSelect({ id, name, label, control, error, options, placeholder }: SelectProps) {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="label-initial">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <select
            id={id}
            {...field}
            className={`${error ? 'select-register-error' : 'select-register'}  outline-none`}
          >
            <option value={0} disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        )}
      />
      <p className="h-5 text-red-600 text-sm  pt-1">{error && error}</p>
    </div>
  )
}