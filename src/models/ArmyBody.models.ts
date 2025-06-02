import { z } from "zod";

export interface ArmyBody {
  id_body: number
  denomination: string
  id_structure: string
}

export const schemaFormArmyBody = z.object({
  id_body: z.optional(z.number()),
  denomination: z.string().min(1, "Denomination is required"),
  id_structure: z.string().optional()
})

export type FormArmyBody = z.infer<typeof schemaFormArmyBody>;

export const initialStateFormArmyBody: FormArmyBody = {
  id_body: 0,
  denomination: "",
  id_structure: ""
}