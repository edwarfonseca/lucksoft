import type { CourseKind } from "./course";
import { grupoNombre } from "./horario";

/**
 * Clase (horario) tal como la ve el estudiante o el docente: lo necesario para
 * mostrar el grupo y decidir si la clase remota está en curso.
 */
export interface ClaseHorario {
  horarioId: string;
  curso: CourseKind;
  grupo: number;
  diaSemana: number;
  horaInicio: string;
  enlaceReunion: string | null;
  activo: boolean;
}

/** Un curso en el que el estudiante está inscrito (su grupo + su avance). */
export interface EnrolledCourse extends ClaseHorario {
  /** Índice de la última lección alcanzada (0 = ninguna; 1..40). */
  progreso: number;
}

/**
 * Un estudiante inscrito en uno de los grupos que dicta el docente, con el curso
 * de ese grupo. Sirve para que "Calificar" muestre solo a sus estudiantes.
 */
export interface TeacherStudent {
  studentId: string;
  curso: CourseKind;
}

/** Inscripción del estudiante: créditos (bolsa compartida) y sus cursos. */
export interface Enrollment {
  creditos: number;
  cursos: EnrolledCourse[];
}

/** Créditos a partir de los cuales se avisa que se van a acabar. */
export const CREDITOS_ADVERTENCIA = 3;
/** Minutos antes del inicio en que ya se puede entrar a la clase remota. */
export const ACCESO_ANTES_MIN = 10;
/** Duración de una clase (minutos). */
export const CLASE_DURACION_MIN = 60;

export type EstadoCreditos = "ok" | "advertencia" | "bloqueado";

/** Estado de los créditos del estudiante. */
export function estadoCreditos(creditos: number): EstadoCreditos {
  if (creditos <= 0) return "bloqueado";
  if (creditos <= CREDITOS_ADVERTENCIA) return "advertencia";
  return "ok";
}

/** Hora de Bogotá (día y minutos del día) para comparar con el horario. */
function ahoraBogota(now: Date): { dow: number; minutos: number } {
  const b = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Bogota" }),
  );
  return { dow: b.getDay(), minutos: b.getHours() * 60 + b.getMinutes() };
}

/**
 * ¿La clase de este horario está en curso ahora? Se habilita desde
 * ACCESO_ANTES_MIN antes del inicio hasta que termina la hora.
 */
export function claseEnCurso(
  diaSemana: number,
  horaInicio: string,
  now: Date = new Date(),
): boolean {
  const { dow, minutos } = ahoraBogota(now);
  if (dow !== diaSemana) return false;
  const [h, m] = horaInicio.split(":").map(Number);
  const inicio = h * 60 + m;
  return (
    minutos >= inicio - ACCESO_ANTES_MIN &&
    minutos < inicio + CLASE_DURACION_MIN
  );
}

/**
 * Enlace de la sala de la clase. Si el grupo tiene un enlace configurado se usa
 * ese (la sala del docente); si no, se genera una sala Jitsi estable por grupo,
 * de modo que docente y estudiantes del mismo grupo entran a la misma reunión.
 */
export function meetingUrl(c: ClaseHorario): string {
  if (c.enlaceReunion && c.enlaceReunion.trim()) return c.enlaceReunion.trim();
  const slug = `LuckSoft-${grupoNombre(c)}-${c.horarioId.slice(0, 8)}`;
  return `https://meet.jit.si/${encodeURIComponent(slug)}`;
}
