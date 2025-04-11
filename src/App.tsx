import { Navigate, Route, Routes } from "react-router-dom"
import Profile from "@/pages/profile/profile"
import Login from "./pages/login/Login"
import { PrivateRoute } from "./config/privateRoute"
import PublicRoute from "./config/publicRoute"
import Register from "./pages/register/Register"

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
        <Route path="/dashboard" element={<h1>hola</h1>}></Route>
        <Route path="/soldiers"></Route>
        <Route path="/soldiers/:id"></Route>
        <Route path="/services"></Route>
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
