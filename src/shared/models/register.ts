import z from 'zod'
import { OFICIAL } from '../constants/Roles';

export const schemanRegister = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
  .min(8, "The password must be at least 8 characters long.")
  .regex(/[A-Z]/, "The password must include at least one capital letter")
  .regex(/[a-z]/, "The password must include at least one lowercase letter")
  .regex(/\d/, "The password must include at least one number"),
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
  role: OFICIAL
}