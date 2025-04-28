import { FormSoldier } from "../../models/Soldier.models";
import { SoldierRepository } from "../domain/SoldierRepository";

export const CreateSoldierService = (token:string, repository: SoldierRepository) => {
  return {
    getAll: async () => await repository.getAll(token),
    save: async (soldierData: FormSoldier) => {
      const payload = { ...soldierData, soldier: { name: soldierData.name, lastname: soldierData.lastname, graduation: soldierData.graduation, id_company: soldierData.id_company, id_barrack: soldierData.id_barrack, id_body: soldierData.id_body } }
      return await repository.save(token, payload)
    },
    delete: async (id: number[]) => await repository.delete(token, id),
    update: async (soldierData: FormSoldier) => await repository.update(token, soldierData)
  };
};