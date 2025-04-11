import { z } from "zod";

export const schemaLogin = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export type Login = z.infer<typeof schemaLogin>

export const initialState: Login = {
  username: "",
  password: "",
}