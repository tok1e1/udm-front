import React, { createContext, useState } from "react";
import { User } from "../api";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
  setUser: (user: User | null) => void;
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: (value: boolean) => value,
  setUser: (user: User | null) => user,
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
