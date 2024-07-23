import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export function useAuth() {
  return useContext(AuthContext);
}
