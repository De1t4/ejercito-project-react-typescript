export interface ProfileProps {
  id_user: number
  username: string
  password: string
  role: string
  soldier: Soldier | null
  services: Services | null
}

export interface Soldier {
  id_soldier: number
  name: string
  lastname: string
  graduation: string
  company: Company
  barrack: Barrack
  body: Body
}

export interface Company {
  id_company: number
  activity: string
}

export interface Barrack {
  id_barrack: number
  name: string
  location: string
}

export interface Body {
  id_body: number
  denomination: string
}

export interface Services {
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