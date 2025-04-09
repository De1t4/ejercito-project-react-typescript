import { GlobalContextType, GlobalProps, TokenData } from "@/models/authModels";
import { loginService, logoutService } from "@/services/authService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "./globalContext";

const AUTH_INFO_USER = "USER_INFO_MILITARY_SYSTEM";

export const GlobalProvider = ({ children }: GlobalProps) => {
  const [authTokens, setAuthTokens] = useState<TokenData | null>(
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem(AUTH_INFO_USER) || "null")
      : null
  );

  const login = useCallback(async (username: string, password: string): Promise<string> => {
    const response: string | TokenData = await loginService(username, password);
    if (typeof response === "string") {
      return response;
    }
    setAuthTokens(response);
    window.localStorage.setItem(AUTH_INFO_USER, JSON.stringify(response));
    return "success";
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTokens = window.localStorage.getItem(AUTH_INFO_USER);
      if (!storedTokens) {
        setAuthTokens(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setAuthTokens(null);
    window.localStorage.removeItem(AUTH_INFO_USER);
  }, []);

  const getUserRole = useCallback(() => {
    if (authTokens) {
      return authTokens.role;
    }
    return null;
  }, [authTokens]);

  const value = useMemo<GlobalContextType>(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: !!authTokens,
      getUserRole,
    }),
    [authTokens, login, logout, getUserRole]
  );

  return (
    <GlobalContext.Provider value={value} >
      {children}
    </GlobalContext.Provider>
  );
};


