import MainLayout from "./MainLayout";
import { BarrackProvider } from "@/context/BarrackProvider";
import { CompanyProvider } from "@/context/CompanyProvider";
import { ArmyBodyProvider } from "@/context/ArmyBodyProvider";
import { SubOficialProvider } from "@/context/SubOficialProvider";

export default function LayoutOficial() {
  return (
    <SubOficialProvider>
      <BarrackProvider>
        <CompanyProvider>
          <ArmyBodyProvider>
            <MainLayout />
          </ArmyBodyProvider>
        </CompanyProvider>
      </BarrackProvider>
    </SubOficialProvider>
  )
}