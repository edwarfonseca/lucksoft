import { userSchema, type Role, type User } from "@/domain/models/user";
import type { AuthService } from "@/domain/ports/AuthService";

const SESSION_KEY = "lucksoft_user";

interface DemoUser {
  user: string;
  pass: string;
  rol: Role;
  nombre: string;
}

// Usuarios de demostración (equivale al antiguo LuckSoft/js/auth.js).
// En la Fase 5 esto lo reemplaza la autenticación real de Supabase.
const DEMO_USERS: DemoUser[] = [
  { user: "docente", pass: "1234", rol: "docente", nombre: "Prof. García" },
  { user: "alumno", pass: "1234", rol: "estudiante", nombre: "Ana López" },
  { user: "alumno2", pass: "1234", rol: "estudiante", nombre: "Luis Pérez" },
];

/**
 * Adaptador de autenticación de prueba sobre sessionStorage.
 * NO usar en producción: las credenciales viven en el cliente.
 */
export class LocalAuthService implements AuthService {
  async login(username: string, password: string): Promise<User | null> {
    const found = DEMO_USERS.find(
      (u) => u.user === username && u.pass === password,
    );
    if (!found) return null;
    const user: User = { id: found.user, name: found.nombre, role: found.rol };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): User | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const parsed = userSchema.safeParse(JSON.parse(raw));
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }
}
