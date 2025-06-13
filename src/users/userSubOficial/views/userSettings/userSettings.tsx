import { useGlobalContext } from "@/context/globalContext";
import SettingsAccount from "./components/SettingsAccount";
import SettingsStructure from "./components/SettingsStructure";
import { OFICIAL } from "@/shared/constants/Roles";

export default function UserSettings() {
  const { profile } = useGlobalContext()


  return (
    <div className="flex flex-col gap-8">
      <SettingsAccount />
      {profile.role === OFICIAL && <SettingsStructure />}
    </div>)
}