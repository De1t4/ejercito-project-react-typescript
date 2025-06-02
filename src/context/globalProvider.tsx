import { GlobalContextType, GlobalProps, TokenData } from "@/models/authModels";
import { loginService } from "@/services/authService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "./globalContext";
import { fetchSoldierData } from "@/services/ProfileService";
import { initialStateProfile, ProfileProps } from "@/users/userSoldier/models/Profile";
import toast from "react-hot-toast";

const AUTH_INFO_USER = "USER_INFO_MILITARY_SYSTEM";

const logoutService = () => {
  window.localStorage.clear()
};

export const GlobalProvider = ({ children }: GlobalProps) => {
  const [profile, setProfile] = useState<ProfileProps>(initialStateProfile)
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
    toast.success('You have logged in successfully, welcome.');
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

  const getProfileUser = useCallback(async () => {
    if (!authTokens?.token) return
    const data = await fetchSoldierData(authTokens.token)
    return data
  }, [authTokens])

  const reloadProfile = useCallback(async () => {
    const data = await getProfileUser()
    if (data?.valueOf() === 'UNAUTHORIZED') {
      toast.error("Your session has expired")
      logout()
    }
    if (typeof data === 'object') {
      setProfile(data)
    }
  }, [getProfileUser, logout])

  useEffect(() => {
    reloadProfile()
  }, [reloadProfile])

  const value = useMemo<GlobalContextType>(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: !!authTokens,
      getUserRole,
      reloadProfile,
      profile
    }),
    [authTokens, login, logout, getUserRole, reloadProfile, profile]
  );

  return (
    <GlobalContext.Provider value={value} >
      {children}
    </GlobalContext.Provider>
  );
};
