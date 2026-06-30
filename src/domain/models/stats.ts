import type { CourseKind } from "./course";

/**
 * Entregas atribuidas a un grupo (horario): número de entregas de sus
 * estudiantes en el curso del grupo, y cuántos estudiantes tiene. Sirve para ver
 * qué grupos entregan más y cuáles menos.
 */
export interface GrupoEntregas {
  horarioId: string;
  curso: CourseKind;
  grupo: number;
  docente: string;
  estudiantes: number;
  entregas: number;
  /** Lección más avanzada del grupo (máx. progreso de sus estudiantes; 0..40). */
  lecciones: number;
  /** Entregas esperadas: suma del progreso de cada estudiante (1 por lección). */
  esperadas: number;
}

/**
 * Grupo más y menos activo por número de entregas. Ignora los grupos sin
 * estudiantes (no aportan información de seguimiento). Devuelve null si no hay
 * ningún grupo con estudiantes.
 */
export function extremosEntregas(grupos: GrupoEntregas[]): {
  mas: GrupoEntregas | null;
  menos: GrupoEntregas | null;
} {
  const conEstudiantes = grupos.filter((g) => g.estudiantes > 0);
  if (conEstudiantes.length === 0) return { mas: null, menos: null };
  const ordenados = [...conEstudiantes].sort((a, b) => b.entregas - a.entregas);
  return { mas: ordenados[0], menos: ordenados[ordenados.length - 1] };
}
