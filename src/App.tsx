import { Route, Routes } from "react-router-dom"
import Profile from "@/pages/profile/profile"
import Login from "./pages/login/Login"
import { PrivateRoute } from "./config/privateRoute"
import PublicRoute from "./config/publicRoute"

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/login"></Route>
        <Route path="/register"></Route>
      </Route>
      <Route element={<PrivateRoute allowedRoles={["SOLDADO"]} />}>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      <Route element={<PrivateRoute allowedRoles={["SUB_OFICIAL", "OFICIAL"]} />}>
       <Route path="/dashboard" element={<h1>hola</h1>}></Route>
      </Route>

      <Route path="/soldier"></Route>
      <Route path="/soldier/:id"></Route>

      <Route path="/company"></Route>
      <Route path="/company/:id"></Route>

      <Route path="/barrack"></Route>
      <Route path="/barrack/:id"></Route>

      <Route path="/army-body"></Route>
      <Route path="/army-body/:id"></Route>


    </Routes>
  )
}

export default App
