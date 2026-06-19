import type { User } from "../models/user";

/**
 * Port de autenticación. Adaptadores: LocalAuthService (login falso +
 * sessionStorage) y, en la Fase 5, SupabaseAuthService (auth real).
 */
export interface AuthService {
  /** Inicia sesión. Devuelve el usuario, o null si las credenciales fallan. */
  login(username: string, password: string): Promise<User | null>;

  /** Cierra la sesión. */
  logout(): Promise<void>;

  /** Usuario de la sesión actual, o null si no hay sesión. */
  getCurrentUser(): User | null;
}
