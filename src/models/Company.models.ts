import { z } from "zod"

export interface Company {
  id_company: number
  activity: string
  id_structure: string
}

export const schemaFormCompany = z.object({
  id_company: z.optional(z.number()),
  activity: z.string().min(1, "Company is required"),
  id_structure: z.string().optional()
})

export type FormCompany = z.infer<typeof schemaFormCompany>;

export const initialStateFormCompany: FormCompany = {
  id_company: 0,
  activity: "",
  id_structure: ""
}