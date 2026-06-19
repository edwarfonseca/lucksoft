import type { User } from "@/domain/models/user";
import type { AuthService } from "@/domain/ports/AuthService";

/** Caso de uso: iniciar sesión. */
export function login(
  auth: AuthService,
  username: string,
  password: string,
): Promise<User | null> {
  return auth.login(username, password);
}

/** Caso de uso: cerrar sesión. */
export function logout(auth: AuthService): Promise<void> {
  return auth.logout();
}
