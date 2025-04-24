import { z } from "zod"

export interface AssignedServices {
  id_services_soldiers: number
  description: string
  id_soldier: number
  soldier: string
  at_service: string
  end_service?: string
  id_service: number
}

export interface Service {
  id_service: number
  description: string
}


export const schemaFormServices = z.object({
  id_service: z.union([
    z.number(),
    z.string()
  ]),
  id_soldier: z.array(z.string()).min(1, "One Soldier is required"),
  createNewService: z.boolean(),
  description: z.optional(z.string()),
  id_services_soldiers: z.optional(z.number())
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
).refine(
  (data) => {
    // Si NO está creando un nuevo servicio, id_service debe ser válido
    if (!data.createNewService) {
      const value = typeof data.id_service === "string" ? parseInt(data.id_service) : data.id_service
      return value > 0
    }
    return true
  },
  {
    path: ["id_service"],
    message: "Service is required",
  }
)

export type FormService = z.infer<typeof schemaFormServices>;

export const initialStateFormService: FormService = {
  id_service: 0,
  id_soldier: [],
  createNewService: false,
  description: "",
  id_services_soldiers: 0
}