import type { MyProfile } from "@/domain/models/profile";
import type { ProfileService } from "@/domain/ports/ProfileService";
import { getSupabaseClient } from "./client";

const BUCKET = "avatars";

/** "Mi perfil" sobre Supabase: tabla profiles + Storage para el avatar. */
export class SupabaseProfileService implements ProfileService {
  private supabase = getSupabaseClient();

  async getMyProfile(): Promise<MyProfile> {
    const { data: auth } = await this.supabase.auth.getUser();
    const id = auth.user?.id;
    if (!id) throw new Error("No hay sesión.");
    const { data, error } = await this.supabase
      .from("profiles")
      .select("full_name, avatar_url, username")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    const row = data as {
      full_name: string | null;
      avatar_url: string | null;
      username: string | null;
    };
    return {
      fullName: row.full_name ?? "",
      avatarUrl: row.avatar_url,
      username: row.username,
    };
  }

  async updateMyProfile(input: {
    fullName: string;
    avatarUrl: string | null;
  }): Promise<void> {
    const { error } = await this.supabase.rpc("actualizar_mi_perfil", {
      p_full_name: input.fullName,
      p_avatar_url: input.avatarUrl,
    });
    if (error) throw new Error(error.message);
  }

  async uploadAvatar(userId: string, file: File): Promise<string> {
    // Un archivo por usuario en su carpeta (la regla del bucket exige que la
    // primera parte de la ruta sea su id). upsert reemplaza el anterior.
    const path = `${userId}/avatar`;
    const { error } = await this.supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type });
    if (error) throw new Error(error.message);
    const { data } = this.supabase.storage.from(BUCKET).getPublicUrl(path);
    // ?v= para evitar que el navegador muestre la imagen anterior en caché.
    return `${data.publicUrl}?v=${Date.now()}`;
  }
}
