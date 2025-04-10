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
  getUserRole: () => Role | null;
}

export interface ResponseLogin {
  token: string;
}

export interface TokenDecoded {
  sub: string;
  role: Role;
  iss: string;
  id: number;
  exp: number;
}

export type Role = "SOLDADO" | "SUB_OFICIAL" | "OFICIAL";

export interface ResponseError {
  httpStatus: string
  message: string
}