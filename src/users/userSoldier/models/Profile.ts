import { ArmyBody } from "@/models/ArmyBody.models"
import { Barrack } from "@/models/Barrack.models"
import { Company } from "@/models/Company.models"

export interface ProfileProps {
  id_user: number
  username: string
  password: string
  role: string
  soldier: SoldierProfile | null
  services: ServicesStatus | null
}

export interface SoldierProfile {
  id_soldier: number
  name: string
  lastname: string
  graduation: string
  company: Company
  barrack: Barrack
  body: ArmyBody
}


export interface ServicesStatus {
  completed: Completed[] | []
  unfinished: Unfinished[] | []
}

export interface Completed {
  id_services_soldier: number
  at_service: string
  end_service: string
  description: string
}

export interface Unfinished {
  id_services_soldier: number
  at_service: string
  end_service: string
  description: string
}

export const initialStateProfile: ProfileProps = {
  id_user: 0,
  username: "",
  password: "",
  role: "",
  soldier: null,
  services: null,
}