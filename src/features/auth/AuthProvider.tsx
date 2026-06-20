import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@/domain/models/user";
import { authService } from "@/app/services";
import {
  login as loginUseCase,
  logout as logoutUseCase,
} from "@/application/authenticate";
import { AuthContext, type AuthState } from "@/features/auth/auth-context";

/**
 * Proveedor de sesión. Resuelve la sesión inicial de forma asíncrona (necesario
 * para auth real) y delega en los casos de uso (que usan el AuthService
 * inyectado).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authService.getCurrentUser().then((u) => {
      if (active) {
        setUser(u);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const value: AuthState = {
    user,
    loading,
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
