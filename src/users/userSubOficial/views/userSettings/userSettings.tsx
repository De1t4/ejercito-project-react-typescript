import SettingsAccount from "./components/SettingsAccount";
import SettingsStructure from "./components/SettingsStructure";

export default function UserSettings() {


  return (
    <div className="flex flex-col gap-8">
      <SettingsAccount />
      <SettingsStructure />
    </div>)
}