interface TabButtonsProps {
  onTabChange: (tab: "completed" | "pending") => void;
}


export const TabButtons: React.FC<TabButtonsProps> = ({ onTabChange }) => {
  return (
    <div className="flex items-center ">
      <button onClick={() => onTabChange('completed')} className="tab-left">
        <p className=" font-medium max-md:text-sm">Completed Services</p>
      </button>
      <button onClick={() => onTabChange('pending')} className="tab-right">
        <p className=" font-medium max-md:text-sm">Pending Services</p>
      </button>
    </div>
  )
}