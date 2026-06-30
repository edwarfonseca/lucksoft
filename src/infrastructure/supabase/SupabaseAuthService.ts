import { userSchema, type Role, type User } from "@/domain/models/user";
import type { AuthService } from "@/domain/ports/AuthService";
import { getSupabaseClient } from "./client";

// LuckSoft usa nombres de usuario; Supabase Auth usa email. Mapeamos
// "alumno" -> "alumno@lucksoft.local" para conservar la UX de login.
const EMAIL_DOMAIN = "lucksoft.local";
const usernameToEmail = (u: string) =>
  `${u.trim().toLowerCase()}@${EMAIL_DOMAIN}`;

interface ProfileRow {
  full_name: string | null;
  role: Role;
  avatar_url: string | null;
}

/** Adaptador de autenticación sobre Supabase Auth + tabla `profiles`. */
export class SupabaseAuthService implements AuthService {
  private supabase = getSupabaseClient();

  async login(username: string, password: string): Promise<User | null> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    });
    if (error || !data.user) return null;
    return this.loadUser(data.user.id, username);
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    if (!data.user) return null;
    const username = (data.user.email ?? "").split("@")[0];
    return this.loadUser(data.user.id, username);
  }

  /** Combina el id de auth con el perfil (rol, nombre) en un User del dominio. */
  private async loadUser(
    id: string,
    fallbackName: string,
  ): Promise<User | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("full_name, role, avatar_url")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    const profile = data as ProfileRow;
    const parsed = userSchema.safeParse({
      id,
      name: profile.full_name || fallbackName,
      role: profile.role,
      avatarUrl: profile.avatar_url,
    });
    return parsed.success ? parsed.data : null;
  }
}
