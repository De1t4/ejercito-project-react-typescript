import { Tab } from "../../models/Tab.models";

interface TabButtonsProps {
  onTabChange: (tab: "completed" | "pending") => void;
  statusTab: Tab
}

export const TabButtons: React.FC<TabButtonsProps> = ({ onTabChange, statusTab }) => {
  return (
    <div className="flex items-center ">
      <button onClick={() => onTabChange('completed')} className={`tab-left ${statusTab === 'completed' ? "tab-active" : "tab-inactive"} `}>
        <p className=" font-medium max-md:text-sm">Completed Services</p>
      </button>
      <button onClick={() => onTabChange('pending')} className={`tab-right ${statusTab === 'pending' ? "tab-active" : "tab-inactive"} `}>
        <p className=" font-medium max-md:text-sm">Pending Services</p>
      </button>
    </div>
  )
}