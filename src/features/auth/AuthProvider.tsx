import { useState, type ReactNode } from "react";
import { authService } from "@/app/services";
import {
  login as loginUseCase,
  logout as logoutUseCase,
} from "@/application/authenticate";
import { AuthContext, type AuthState } from "@/features/auth/auth-context";

/**
 * Proveedor de sesión. Mantiene el usuario actual en estado de React y delega en
 * los casos de uso (que a su vez usan el AuthService inyectado).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const value: AuthState = {
    user,
    async login(username, password) {
      const result = await loginUseCase(authService, username, password);
      setUser(result);
      return result !== null;
    },
    async logout() {
      await logoutUseCase(authService);
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
