import { ArmyBody } from "@/models/ArmyBody.models"
import { Barrack } from "@/models/Barrack.models"
import { Company } from "@/models/Company.models"
import { z } from "zod"

export interface SubOficial {
  id_user: number
  username: string
  soldier: Soldier
}

interface Soldier {
  id_soldier: number
  name: string
  lastname: string
  graduation: string | null
  company: Company
  barrack: Barrack
  body: ArmyBody
}

export const schemaFormSubOficial = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
    .min(8, "The password must be at least 8 characters long.")
    .regex(/[A-Z]/, "The password must include at least one capital letter")
    .regex(/[a-z]/, "The password must include at least one lowercase letter")
    .regex(/\d/, "The password must include at least one number"),
  //SOLDIER DATA
  name: z.string().optional(),
  lastname: z.string().optional(),
  graduation: z.string().optional(),
  id_company: z.union([z.number(), z.string()]).optional(),
  id_barrack: z.union([z.number(), z.string()]).optional(),
  id_body: z.union([z.number(), z.string()]).optional(),
  isDesignateSoldier: z.optional(z.boolean())
}).refine(data => {
  if (data.isDesignateSoldier === true) {
    return (
      !!data.name &&
      !!data.lastname &&
      (typeof data.id_company === 'number' ? data.id_company > 0 : !!data.id_company) &&
      (typeof data.id_barrack === 'number' ? data.id_barrack > 0 : !!data.id_barrack) &&
      (typeof data.id_body === 'number' ? data.id_body > 0 : !!data.id_body)
    );
  }
  return true; // Si isDesignateSoldier no es true (false o undefined), la validación pasa
}, {
  message: "All fields must be completed in order to assign a soldier.",
  path: ["isDesignateSoldier"], // Puedes especificar un path para asociar el error (aparecerá en 'name' y otros si la validación falla)
});
export type FormSubOficial = z.infer<typeof schemaFormSubOficial>;


export const initalStateFormSubOficial: FormSubOficial = {
  username: "",
  lastname: "",
  name: "",
  password: "",
  isDesignateSoldier: false,
  id_barrack: 0,
  id_body: 0,
  id_company: 0
}

export interface FormEditSubOfficial {
  id_user: number
  username: string
  id_structure: string
  soldier: SoldierSubOfficial | null
}
interface SoldierSubOfficial {
  name?: string
  lastname?: string
  graduation?: string
  id_barrack?: string | number
  id_body?: string | number
  id_company?: string | number
}
