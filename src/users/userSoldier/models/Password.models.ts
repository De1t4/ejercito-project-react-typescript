import z from 'zod'

export const schemaValidation = z.object({
  currentPassword: z.string().min(1, 'Password is required'),
  newPassword: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type FormValidation = z.infer<typeof schemaValidation>

export const initialStatePassword: FormValidation = {
  newPassword: "",
  currentPassword: "",
  confirmPassword: ""
}