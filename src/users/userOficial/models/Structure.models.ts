import { z } from "zod";

export const schemaStructure = z.object({
  name: z.string().min(1, "Name structure is required"),
  description: z.string().min(1, "Description is required"),
})

export type FormStructure = z.infer<typeof schemaStructure>;

export const initialStateStructure: FormStructure = {
  name: "",
  description: "",
}