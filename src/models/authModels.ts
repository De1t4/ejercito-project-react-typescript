import { ProfileProps } from "@/users/userSoldier/models/Profile";
import { ReactNode } from "react";

export interface TokenData {
  username: string,
  role: Role,
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
  reloadProfile: () => void
  profile: ProfileProps
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


type status = 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND'

export interface ResponseError {
  httpStatus: status
  message: string
}