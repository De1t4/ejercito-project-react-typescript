import { FormSoldier } from "@/users/userSubOficial/models/Soldier.models";

export const mapSoldier = (soldier: FormSoldier) => {
  const payload =
  {
    username: soldier.username, password: soldier.password, soldier:
    {
      name: soldier.name,
      lastname: soldier.lastname,
      graduation: soldier.graduation,
      id_company: soldier.id_company,
      id_barrack: soldier.id_barrack,
      id_body: soldier.id_body,
      id_structure: soldier.id_structure
    }
  }
  return payload
} 