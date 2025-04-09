import { Route, Routes } from "react-router-dom"
import Profile from "@/pages/profile/profile"
import Login from "./pages/login/Login"



function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} ></Route>
      <Route path="/login"></Route>
      <Route path="/register"></Route>
      <Route path="/profile" element={<Profile />}></Route>

      <Route path="/dashboard"></Route>

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
