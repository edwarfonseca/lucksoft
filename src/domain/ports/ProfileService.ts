import type { MyProfile } from "../models/profile";

/**
 * Port de "Mi perfil": el propio usuario consulta y edita su nombre para mostrar
 * y su avatar. Solo lo implementa el adaptador de Supabase (en modo local es
 * null, porque el avatar necesita Storage y la edición necesita auth real).
 */
export interface ProfileService {
  /** Perfil del usuario autenticado (nombre, avatar, usuario). */
  getMyProfile(): Promise<MyProfile>;

  /** Actualiza el nombre para mostrar y el avatar del usuario autenticado. */
  updateMyProfile(input: {
    fullName: string;
    avatarUrl: string | null;
  }): Promise<void>;

  /** Sube una imagen de avatar y devuelve su URL pública (lista para guardar). */
  uploadAvatar(userId: string, file: File): Promise<string>;
}
