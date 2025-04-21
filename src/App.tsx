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
        <Route path="/settings"></Route>
      </Route>
      {/* ROUTES OFICIAL */}
      <Route element={<PrivateRoute allowedRoles={["OFICIAL"]} />}>
        <Route path="/sub-oficials"></Route>
        <Route path="/companies"></Route>
        <Route path="/barracks"></Route>
        <Route path="/army-bodies"></Route>
      </Route>
    </Routes>
  )
}

export default App
