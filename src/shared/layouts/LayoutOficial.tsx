import MainLayout from "./MainLayout";
import { BarrackProvider } from "@/context/BarrackProvider";
import { CompanyProvider } from "@/context/CompanyProvider";
import { ArmyBodyProvider } from "@/context/ArmyBodyProvider";

export default function LayoutOficial() {
  return (
    <BarrackProvider>
      <CompanyProvider>
        <ArmyBodyProvider>
          <MainLayout />
        </ArmyBodyProvider>
      </CompanyProvider>
    </BarrackProvider>
  )
}