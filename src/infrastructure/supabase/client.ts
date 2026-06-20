import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** ¿Hay credenciales de Supabase en el entorno (.env)? */
export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/**
 * Devuelve el cliente de Supabase (singleton). Lanza si no está configurado;
 * la raíz de composición solo lo usa cuando isSupabaseConfigured es true.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    if (!url || !anonKey) {
      throw new Error(
        "Supabase no está configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env",
      );
    }
    client = createClient(url, anonKey);
  }
  return client;
}
