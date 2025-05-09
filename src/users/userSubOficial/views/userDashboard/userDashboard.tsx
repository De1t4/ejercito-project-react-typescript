import { useGlobalContext } from "@/context/globalContext"
import { Dashboard } from "./components/Dashboard"

export const UserDashboard = () => {
  const { authTokens } = useGlobalContext()
  if (!authTokens) throw new Error("Error");

  return (
    <div className=" ">
      <Dashboard token={authTokens.token} />
    </div>
  )
}