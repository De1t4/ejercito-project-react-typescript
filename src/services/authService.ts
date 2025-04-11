import { VITE_BACK_END_URL } from "@/config/config-env";
import { ResponseError, ResponseLogin, TokenData, TokenDecoded } from "@/models/authModels";
import { jwtDecode } from "jwt-decode";

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
      if(errorResponse.httpStatus === "NOT_FOUND") {
        return "NOT_FOUND";
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

