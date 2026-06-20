import { createContext, useContext } from "react";
import type { User } from "@/domain/models/user";

/** Estado de sesión expuesto por el contexto de autenticación. */
export interface AuthState {
  user: User | null;
  /** true mientras se resuelve la sesión inicial (auth asíncrona). */
  loading: boolean;
  /** Inicia sesión; devuelve true si las credenciales son válidas. */
  login(username: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthState | null>(null);

/** Hook para consumir la sesión. Falla si se usa fuera de <AuthProvider>. */
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>.");
  return ctx;
}
