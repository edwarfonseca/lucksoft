import type { Comida, Mascota } from "@/domain/models/pet";
import type { PetService } from "@/domain/ports/PetService";
import { getSupabaseClient } from "./client";

/** Fila que devuelven `mascota_estado` / `mascota_alimentar`. */
interface EstadoRow {
  nombre: string;
  energia: number;
  saldo: number;
}

interface ComidaRow {
  id: string;
  nombre: string;
  emoji: string;
  costo: number;
  energia: number;
}

function toMascota(r: EstadoRow): Mascota {
  return { nombre: r.nombre, energia: r.energia, monedas: r.saldo };
}

/**
 * Mascota sobre Supabase. La energía (por progreso) y las monedas (por notas) las
 * calcula el servidor en funciones SECURITY DEFINER; aquí solo se invocan.
 */
export class SupabasePetService implements PetService {
  private supabase = getSupabaseClient();

  private async firstRow(
    rpc: "mascota_estado" | "mascota_alimentar",
    args?: Record<string, unknown>,
  ): Promise<Mascota> {
    const { data, error } = await this.supabase.rpc(rpc, args);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as EstadoRow[];
    if (rows.length === 0) throw new Error("La mascota no está disponible");
    return toMascota(rows[0]);
  }

  getMascota(): Promise<Mascota> {
    return this.firstRow("mascota_estado");
  }

  alimentar(comidaId: string): Promise<Mascota> {
    return this.firstRow("mascota_alimentar", { p_comida: comidaId });
  }

  async renombrar(nombre: string): Promise<Mascota> {
    const { error } = await this.supabase.rpc("mascota_renombrar", {
      p_nombre: nombre,
    });
    if (error) throw new Error(error.message);
    return this.getMascota();
  }

  async getComidas(): Promise<Comida[]> {
    const { data, error } = await this.supabase
      .from("mascota_comidas")
      .select("id, nombre, emoji, costo, energia")
      .order("orden", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as ComidaRow[]).map((c) => ({
      id: c.id,
      nombre: c.nombre,
      emoji: c.emoji,
      costo: c.costo,
      energia: c.energia,
    }));
  }
}
