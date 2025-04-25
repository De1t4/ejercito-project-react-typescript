import { OptionsProps } from "@/shared/components/FormSelect"
import { ArmyBody } from "@/models/ArmyBody.models"
import { Barrack } from "@/models/Barrack.models"
import { Company } from "@/models/Company.models"
import { Service } from "@/users/userSubOficial/models/Services.models"
import { Soldier } from "@/users/userSubOficial/models/Soldier.models"

export const getDaysDifferenceFromToday = (dateString: string): string => {
  const today = new Date()
  const inputDate = new Date(dateString)

  const timeDifference = today.getTime() - inputDate.getTime();
  const diffInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  if (diffInDays == 0) {
    return "Today"
  }

  if (diffInDays <= 1) {
    return diffInDays + " day"
  }

  return diffInDays + " days"
}

export const urlParams = (search: string, page: number, size: number) => {
  const params = new URLSearchParams()

  if (search.trim() !== "") {
    params.append("search", search)
  }

  params.append("page", page.toString())
  params.append("size", size.toString())
  return params
}


export const mapBarracksToOptions = (barracks: Barrack[]): OptionsProps[] =>
  barracks.map(b => ({
    title: b.name,
    value: b.id_barrack.toString()
  }));

export const mapCompaniesToOptions = (barracks: Company[]): OptionsProps[] =>
  barracks.map(b => ({
    title: b.activity,
    value: b.id_company.toString()
  }));

export const mapBodiesToOptions = (barracks: ArmyBody[]): OptionsProps[] =>
  barracks.map(b => ({
    title: b.denomination,
    value: b.id_body.toString()
  }));

export const mapServicesToOptions = (services: Service[]): OptionsProps[] =>
  services.map(b => ({
    title: b.description,
    value: b.id_service.toString()
  }));

interface MultipleOptionsProps {
  value: string
  desc: string
  label:string
}

export const mapSoldiersToOptions = (soldiers: Soldier[]): MultipleOptionsProps[] =>
  soldiers.map(b => ({
    value: b.id_soldier.toString(),
    desc: b.name.concat(" " + b.lastname),
    label: b.name.concat(" " + b.lastname)
  }));