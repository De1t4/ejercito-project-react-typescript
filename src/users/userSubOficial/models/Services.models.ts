import { z } from "zod"

export interface AssignedServices {
  id_services_soldiers: number
  description: string
  id_soldier: number
  soldier: string
  at_service: string
  end_service?: string
}

export const schemaFormServices = z.object({
  id_services_soldiers: z.number().min(1, "Company is required").or(z.string().min(1, "Company is required")),
  id_soldier: z.array(z.string().or(z.number())).min(1, "1 Soldier is required"),
  createNewService: z.boolean(),
  description: z.optional(z.string())

}).refine((data) => data.createNewService == true, {
  path: ["description"],
  message: "Description es required"
})