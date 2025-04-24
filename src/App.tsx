import { Navigate, Route, Routes } from "react-router-dom"
import Profile from "@/pages/profile/profile"
import Login from "./pages/login/Login"
import { PrivateRoute } from "./config/privateRoute"
import PublicRoute from "./config/publicRoute"
import Register from "./pages/register/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import Soldiers from "./pages/soldier/Soldiers"
import SoldierProfile from "./pages/soldierProfile/SoldierProfile"
import Services from "./pages/services/Services"
import Settings from "./pages/settings/Settings"
import SubOficials from "./pages/subOficials/SubOficials"
import Companies from "./pages/companies/Companies"
import Barracks from "./pages/barracks/Barracks"
import ArmyBodies from "./pages/armyBodies/ArmyBodies"

function App() {
  return (
    <Routes>
      {/* ROUTES PUBLICS */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
      {/* ROUTES SOLDIER */}
      <Route element={<PrivateRoute allowedRoles={["SOLDADO"]} />}>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      {/* ROUTES SUB OFICIAL AND OFICIAL */}
      <Route element={<PrivateRoute allowedRoles={["SUB_OFICIAL", "OFICIAL"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/soldiers" element={<Soldiers />}></Route>
        <Route path="/soldiers/:id" element={<SoldierProfile />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Route>
      {/* ROUTES OFICIAL */}
      <Route element={<PrivateRoute allowedRoles={["OFICIAL"]} />}>
        <Route path="/sub-oficials" element={<SubOficials/>}></Route>
        <Route path="/companies" element={<Companies/>}></Route>
        <Route path="/barracks" element={<Barracks/>}></Route>
        <Route path="/army-bodies" element={<ArmyBodies/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
