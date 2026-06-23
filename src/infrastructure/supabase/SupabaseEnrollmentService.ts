import { courseKindSchema } from "@/domain/models/course";
import type {
  ClaseHorario,
  EnrolledCourse,
  Enrollment,
} from "@/domain/models/enrollment";
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

/** Inscripción propia sobre Supabase (perfil + sus inscripciones a grupos). */
export class SupabaseEnrollmentService implements EnrollmentService {
  private supabase = getSupabaseClient();

  async getStudentEnrollment(userId: string): Promise<Enrollment> {
    const [perfil, inscripciones] = await Promise.all([
      this.supabase
        .from("profiles")
        .select("creditos_pagados")
        .eq("id", userId)
        .single(),
      this.supabase
        .from("inscripciones")
        .select(`progreso, horario:horarios(${HORARIO_COLS})`)
        .eq("estudiante_id", userId),
    ]);
    if (perfil.error) throw new Error(perfil.error.message);
    if (inscripciones.error) throw new Error(inscripciones.error.message);

    const rows = (inscripciones.data ?? []) as unknown as {
      progreso: number | null;
      horario: HorarioRow | null;
    }[];
    const cursos: EnrolledCourse[] = rows.flatMap((r) => {
      const clase = r.horario ? toClase(r.horario) : null;
      return clase ? [{ ...clase, progreso: r.progreso ?? 0 }] : [];
    });
    cursos.sort((a, b) =>
      a.curso === b.curso ? a.grupo - b.grupo : a.curso.localeCompare(b.curso),
    );

    return {
      creditos:
        (perfil.data as { creditos_pagados: number | null }).creditos_pagados ??
        0,
      cursos,
    };
  }

  async setProgress(horarioId: string, leccionIdx: number): Promise<void> {
    const { error } = await this.supabase.rpc("set_progreso", {
      p_horario_id: horarioId,
      p_idx: leccionIdx,
    });
    if (error) throw new Error(error.message);
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
