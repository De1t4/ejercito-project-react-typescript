import { GlobalContextType } from "@/models/authModels";
import { createContext, useContext } from "react";

export const GlobalContext = createContext<GlobalContextType>({
  login: async () => "",
  logout: () => { },
  isLoggedIn: false,
  authTokens: null,
  getUserRole: () => null,
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Error en el contexto");
  }
  return context;
};
