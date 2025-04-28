import { ArmyBody } from "@/models/ArmyBody.models"
import { Barrack } from "@/models/Barrack.models"
import { Company } from "@/models/Company.models"

export interface SubOficial {
  id_soldier: number
  name: string
  lastname: string
  graduation: string | null
  company: Company
  barrack: Barrack
  body: ArmyBody
}