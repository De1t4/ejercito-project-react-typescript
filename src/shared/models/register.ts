import z from 'zod'

export const schemanRegister = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Password is required"),
  role: z.string().min(1, "Select an option")
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords don't match"
})

export type FormRegister = z.infer<typeof schemanRegister>;

export const intiialStateRegister: FormRegister = {
  username: "",
  password: "",
  confirmPassword: "",
  role: ""
}