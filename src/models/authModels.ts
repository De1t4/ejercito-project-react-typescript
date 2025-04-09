import { ReactNode } from "react";

export interface TokenData {
  username: string,
  role: string,
  id: number,
  token: string,
  accessExpiresIn: number
}

export interface GlobalProps {
  children: ReactNode;
}

export interface GlobalContextType {
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
  isLoggedIn: boolean;
  authTokens: TokenData | null;
  getUserRole: () => string | null;
}

export interface ResponseLogin {
  token: string;
}

export interface TokenDecoded {
  sub: string;
  role: string;
  iss: string;
  id: number;
  exp: number;
}