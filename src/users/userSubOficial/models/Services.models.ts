import { z } from "zod"

export interface AssignedServices {
  id_services_soldiers: number
  description: string
  id_soldier: number
  soldier: string
  at_service: string
  end_service?: string
}

export interface Service {
  id_service: number
  description: string
}


export const schemaFormServices = z.object({
  id_service: z.number().min(1, "Service is required").or(z.string().min(1, "Service is required")),
  id_soldier: z.array(z.string()).min(1, "One Soldier is required"),
  createNewService: z.boolean(),
  description: z.optional(z.string())
}).refine(
  (data) => {
    // Solo validar que description exista si createNewService es true
    if (data.createNewService) {
      return data.description && data.description.trim().length > 0
    }
    return true
  },
  {
    path: ["description"],
    message: "Description is required when creating a new service",
  }
)


export type FormService = z.infer<typeof schemaFormServices>;

export const initialStateFormService: FormService = {
  id_service: 0,
  id_soldier: [],
  createNewService: false,
  description: ""
}