import { FunctionsHttpError } from "@supabase/supabase-js";
import {
  managedProfileSchema,
  type CreateUserInput,
  type ManagedProfile,
  type UpdateProfileInput,
} from "@/domain/models/profile";
import {
  horarioSchema,
  type CreateHorarioInput,
  type Horario,
  type UpdateHorarioInput,
} from "@/domain/models/horario";
import type { AdminService } from "@/domain/ports/AdminService";
import { getSupabaseClient } from "./client";

interface ProfileRow {
  id: string;
  role: string;
  nombres: string | null;
  apellidos: string | null;
  full_name: string | null;
  edad: number | null;
  activo: boolean;
  curso: string | null;
  horario_id: string | null;
  creditos_pagados: number | null;
  nombre_acudiente: string | null;
  numero_acudiente: string | null;
  pais: string | null;
}

interface HorarioRow {
  id: string;
  curso: string;
  grupo: number;
  dia_semana: number;
  hora_inicio: string;
  docente_id: string | null;
  activo: boolean;
  docente: { full_name: string | null } | null;
}

/** Administración de usuarios sobre Supabase (tabla profiles + Edge Functions). */
export class SupabaseAdminService implements AdminService {
  private supabase = getSupabaseClient();

  private toDomain(r: ProfileRow): ManagedProfile | null {
    const parsed = managedProfileSchema.safeParse({
      id: r.id,
      role: r.role,
      nombres: r.nombres,
      apellidos: r.apellidos,
      fullName: r.full_name ?? "",
      edad: r.edad,
      activo: r.activo,
      curso: r.curso,
      horarioId: r.horario_id,
      creditosPagados: r.creditos_pagados ?? 0,
      nombreAcudiente: r.nombre_acudiente,
      numeroAcudiente: r.numero_acudiente,
      pais: r.pais,
    });
    return parsed.success ? parsed.data : null;
  }

  /** Extrae el mensaje de error que devuelven nuestras Edge Functions. */
  private async invoke(
    fn: string,
    body: Record<string, unknown>,
  ): Promise<void> {
    const { error } = await this.supabase.functions.invoke(fn, { body });
    if (!error) return;
    let message = error.message;
    if (error instanceof FunctionsHttpError) {
      try {
        const payload = (await error.context.json()) as { error?: string };
        if (payload?.error) message = payload.error;
      } catch {
        /* sin cuerpo JSON */
      }
    }
    throw new Error(message);
  }

  async listProfiles(): Promise<ManagedProfile[]> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .order("role", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as ProfileRow[]).flatMap((r) => {
      const p = this.toDomain(r);
      return p ? [p] : [];
    });
  }

  async createUser(input: CreateUserInput): Promise<void> {
    await this.invoke("admin-create-user", {
      username: input.username,
      password: input.password,
      role: input.role,
      nombres: input.nombres,
      apellidos: input.apellidos,
      edad: input.edad,
      curso: input.curso ?? null,
      horario_id: input.horarioId ?? null,
      creditos_pagados: input.creditosPagados ?? 0,
      nombre_acudiente: input.nombreAcudiente ?? null,
      numero_acudiente: input.numeroAcudiente ?? null,
      pais: input.pais ?? null,
    });
  }

  async updateProfile(id: string, changes: UpdateProfileInput): Promise<void> {
    const row: Record<string, unknown> = {};
    if (changes.role !== undefined) row.role = changes.role;
    if (changes.nombres !== undefined) row.nombres = changes.nombres;
    if (changes.apellidos !== undefined) row.apellidos = changes.apellidos;
    if (changes.nombres !== undefined || changes.apellidos !== undefined) {
      row.full_name =
        `${changes.nombres ?? ""} ${changes.apellidos ?? ""}`.trim();
    }
    if (changes.edad !== undefined) row.edad = changes.edad;
    if (changes.activo !== undefined) row.activo = changes.activo;
    if (changes.curso !== undefined) row.curso = changes.curso;
    if (changes.horarioId !== undefined) row.horario_id = changes.horarioId;
    if (changes.creditosPagados !== undefined)
      row.creditos_pagados = changes.creditosPagados;
    if (changes.nombreAcudiente !== undefined)
      row.nombre_acudiente = changes.nombreAcudiente;
    if (changes.numeroAcudiente !== undefined)
      row.numero_acudiente = changes.numeroAcudiente;
    if (changes.pais !== undefined) row.pais = changes.pais;

    const { error } = await this.supabase
      .from("profiles")
      .update(row)
      .eq("id", id);
    if (error) throw new Error(error.message);
  }

  async deleteUser(id: string): Promise<void> {
    await this.invoke("admin-delete-user", { id });
  }

  private horarioToDomain(r: HorarioRow): Horario | null {
    const parsed = horarioSchema.safeParse({
      id: r.id,
      curso: r.curso,
      grupo: r.grupo,
      diaSemana: r.dia_semana,
      horaInicio: r.hora_inicio,
      docenteId: r.docente_id,
      docenteNombre: r.docente?.full_name ?? null,
      activo: r.activo,
    });
    return parsed.success ? parsed.data : null;
  }

  async listHorarios(): Promise<Horario[]> {
    const { data, error } = await this.supabase
      .from("horarios")
      .select(
        "id, curso, grupo, dia_semana, hora_inicio, docente_id, activo, docente:profiles!horarios_docente_id_fkey(full_name)",
      )
      .order("curso", { ascending: true })
      .order("grupo", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as unknown as HorarioRow[]).flatMap((r) => {
      const h = this.horarioToDomain(r);
      return h ? [h] : [];
    });
  }

  async createHorario(input: CreateHorarioInput): Promise<void> {
    const { error } = await this.supabase.from("horarios").insert({
      curso: input.curso,
      dia_semana: input.diaSemana,
      hora_inicio: input.horaInicio,
      docente_id: input.docenteId,
    });
    if (error) throw new Error(error.message);
  }

  async updateHorario(id: string, changes: UpdateHorarioInput): Promise<void> {
    const row: Record<string, unknown> = {};
    if (changes.curso !== undefined) row.curso = changes.curso;
    if (changes.diaSemana !== undefined) row.dia_semana = changes.diaSemana;
    if (changes.horaInicio !== undefined) row.hora_inicio = changes.horaInicio;
    if (changes.docenteId !== undefined) row.docente_id = changes.docenteId;
    if (changes.activo !== undefined) row.activo = changes.activo;

    const { error } = await this.supabase
      .from("horarios")
      .update(row)
      .eq("id", id);
    if (error) throw new Error(error.message);
  }

  async deleteHorario(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("horarios")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  }

  async consumeCreditsToday(): Promise<number> {
    const { data, error } = await this.supabase.rpc(
      "admin_consumir_creditos_hoy",
    );
    if (error) throw new Error(error.message);
    return (data as number | null) ?? 0;
  }
}
