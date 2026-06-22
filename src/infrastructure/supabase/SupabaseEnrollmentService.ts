import { courseKindSchema } from "@/domain/models/course";
import type { ClaseHorario, Enrollment } from "@/domain/models/enrollment";
import type { EnrollmentService } from "@/domain/ports/EnrollmentService";
import { getSupabaseClient } from "./client";

interface HorarioRow {
  id: string;
  curso: string;
  grupo: number;
  dia_semana: number;
  hora_inicio: string;
  enlace_reunion: string | null;
  activo: boolean;
}

function toClase(r: HorarioRow): ClaseHorario | null {
  const curso = courseKindSchema.safeParse(r.curso);
  if (!curso.success) return null;
  return {
    horarioId: r.id,
    curso: curso.data,
    grupo: r.grupo,
    diaSemana: r.dia_semana,
    horaInicio: r.hora_inicio,
    enlaceReunion: r.enlace_reunion,
    activo: r.activo,
  };
}

const HORARIO_COLS =
  "id, curso, grupo, dia_semana, hora_inicio, enlace_reunion, activo";

/** Inscripción propia sobre Supabase (perfil + horario del usuario). */
export class SupabaseEnrollmentService implements EnrollmentService {
  private supabase = getSupabaseClient();

  async getStudentEnrollment(userId: string): Promise<Enrollment> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(
        `creditos_pagados, horario:horarios!profiles_horario_id_fkey(${HORARIO_COLS})`,
      )
      .eq("id", userId)
      .single();
    if (error) throw new Error(error.message);

    const row = data as unknown as {
      creditos_pagados: number | null;
      horario: HorarioRow | null;
    };
    return {
      creditos: row.creditos_pagados ?? 0,
      clase: row.horario ? toClase(row.horario) : null,
    };
  }

  async getTeacherClasses(userId: string): Promise<ClaseHorario[]> {
    const { data, error } = await this.supabase
      .from("horarios")
      .select(HORARIO_COLS)
      .eq("docente_id", userId)
      .eq("activo", true)
      .order("dia_semana", { ascending: true })
      .order("hora_inicio", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as HorarioRow[]).flatMap((r) => {
      const c = toClase(r);
      return c ? [c] : [];
    });
  }
}
