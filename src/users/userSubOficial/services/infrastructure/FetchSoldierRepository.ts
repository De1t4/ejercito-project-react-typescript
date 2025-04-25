import { ResponseError } from "@/models/authModels";
import { FormSoldier, Soldier } from "../../models/Soldier.models";
import { SoldierRepository } from "../domain/SoldierRepository";

const API_URL = import.meta.env.VITE_BACK_END_URL

export const FetchSoldierRepository = (): SoldierRepository => {
  
  return {
    getAll: async (token: string) => {
      const res = await fetch(`${API_URL}/v1/soldiers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw new Error("Error finishing soldiers")
      }
      const data: Soldier[] = await res.json()
      return data;
    },
    save: async (token: string, soldierData: FormSoldier) => {
      const res = await fetch(`${API_URL}/v1/soldiers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(soldierData)
      })

      if (!res.ok) {
        const errorResponse: ResponseError = await res.json();
        if (errorResponse.httpStatus === "BAD_REQUEST") {
          alert("The user " + soldierData.username + "has already been registered")
          throw ("The user " + soldierData.username + "has already been registered")
        }
        throw new Error("Error create soldier")
      }
      return "success"
    },
    delete: async (token: string, id: number[]) => {
      await fetch(`${API_URL}/v1/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id)
      })
    },
    update: async (token: string, soldierData: FormSoldier) => {
       await fetch(`${API_URL}/v1/soldiers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(soldierData)
      })
    }
  }
}