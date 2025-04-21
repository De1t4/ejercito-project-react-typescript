import { OptionsProps } from "@/shared/components/FormSelect"
import { Barrack, Company, Body } from "@/users/userSoldier/models/Profile"

export const getDaysDifferenceFromToday = (dateString: string): string => {
  const today = new Date("2025-04-16T02:42:21.366Z")
  const inputDate = new Date(dateString)

  // Restamos las fechas en milisegundos y dividimos por milisegundos por día
  const diffInTime = today.getTime() - inputDate.getTime()
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24))

  if (diffInDays <= 1) {
    return diffInDays + " day"
  }

  return diffInDays + " days"
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

export const mapBodiesToOptions = (barracks: Body[]): OptionsProps[] =>
  barracks.map(b => ({
    title: b.denomination,
    value: b.id_body.toString()
  }));
