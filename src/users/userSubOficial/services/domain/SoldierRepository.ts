import { FormSoldier, Soldier } from "../../models/Soldier.models";

export interface SoldierRepository {
  getAll(token:string): Promise<Soldier[]>;
  save(token:string, soldierData: FormSoldier): Promise<"success" | undefined>
  delete(token:string, id: number[]): Promise<void>;
  update(token:string, soldierData: FormSoldier): Promise<void>
}