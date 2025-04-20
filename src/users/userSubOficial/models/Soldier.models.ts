import { z } from "zod"

export interface Soldier {
  id_user: number
  id_soldier: number
  username: string
  name: string
  lastname: string
  id_barrack: number
  barrack: string
  id_company: number
  company: string
  id_body: number
  army_body: string
}

export const schemaFormSoldier = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
    .min(8, "The password must be at least 8 characters long.")
    .regex(/[A-Z]/, "The password must include at least one capital letter")
    .regex(/[a-z]/, "The password must include at least one lowercase letter")
    .regex(/\d/, "The password must include at least one number"),
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Lastaname is required"),
  graduation: z.string().optional(),
  id_company: z.number().min(1, "Company is required").or(z.string().min(1, "Company is required")),
  id_barrack: z.number().min(1, "Barrack is required").or(z.string().min(1, "Barrack is required")),
  id_body: z.number().min(1, "Army body is required").or(z.string().min(1, "Army body is required")),
})

export type FormSoldier = z.infer<typeof schemaFormSoldier>;

export const initialStateFormSoldier: FormSoldier = {
  username: "",
  password: "",
  name: "",
  lastname: "",
  graduation: undefined,
  id_barrack: 0,
  id_company: 0,
  id_body: 0
}

export interface Structure {
  companies: Company[]
  army_bodies: ArmyBody[]
  barracks: Barrack[]
}

export interface Company {
  id_company: number
  activity: string
}

export interface ArmyBody {
  id_body: number
  denomination: string
}

export interface Barrack {
  id_barrack: number
  name: string
  location: string
}