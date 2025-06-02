import { z } from "zod";

export interface Barrack {
  id_barrack: number
  name: string
  location: string
  id_structure: string
}

export const schemaFormBarrack = z.object({
  id_barrack: z.optional(z.number()),
  name: z.string().min(1, "Name Barrack is required"),
  location: z.string().min(1, "Location is required"),
  id_structure: z.string().optional()
})

export type FormBarrack = z.infer<typeof schemaFormBarrack>;

export const initialStateFormBarrack: FormBarrack = {
  id_barrack: 0,
  name: "",
  location: "",
  id_structure: ""
}