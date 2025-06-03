import { VITE_BACK_END_URL } from "@/config/config-env";
import { ResponseError, ResponseLogin, TokenData, TokenDecoded } from "@/models/authModels";
import { FormRegister } from "@/shared/models/register";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const API_URL = VITE_BACK_END_URL;

export const loginService = async (
  username: string,
  password: string
): Promise<string | TokenData> => {

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorResponse: ResponseError = await res.json();
      if (errorResponse.httpStatus === "NOT_FOUND") {
        toast.error("Username or Password is incorrect")
        return errorResponse.httpStatus;
      }
      throw new Error("Error en la respuesta del servidor");
    }

    const data: ResponseLogin = await res.json();
    const infoToken: TokenDecoded = jwtDecode(data.token);
    return {
      id: infoToken.id,
      token: data.token,
      username: infoToken.sub,
      role: infoToken.role,
      accessExpiresIn: infoToken.exp,
    };
  } catch (err) {
    console.error(err);
    return "Ocurrió un error al intentar iniciar sesión";
  }
};

export const registerService = async (dataRegister: FormRegister) => {

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dataRegister, username: dataRegister.username.trim(), password: dataRegister.password.trim() }),
    });

    if (!res.ok) {
      const errorResponse: ResponseError = await res.json();
      if (errorResponse.httpStatus === "NOT_FOUND") {
        toast(errorResponse.message, { icon: "🚧" })
        return "NOT_FOUND";
      }
      if (errorResponse.httpStatus === "BAD_REQUEST") {
        toast(errorResponse.message, { icon: "🚧" })
        return "BAD_REQUEST"
      }
      throw new Error("Error en la respuesta del servidor");
    }
    toast.success("The user was registered successfully")
  } catch (err) {
    console.error(err);
    return "Ocurrió un error al intentar iniciar sesión";
  }
}