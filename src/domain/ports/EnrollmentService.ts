import type { ClaseHorario, Enrollment } from "../models/enrollment";

/**
 * Port para consultar la inscripción propia. Lo usa la vista del estudiante
 * (su curso, créditos y clase) y la del docente (los grupos que dicta).
 * Solo lo implementa el adaptador de Supabase (en modo local es null).
 */
export interface EnrollmentService {
  /** Inscripción del estudiante autenticado (clase + créditos). */
  getStudentEnrollment(userId: string): Promise<Enrollment>;

  /** Grupos activos que dicta el docente autenticado. */
  getTeacherClasses(userId: string): Promise<ClaseHorario[]>;

  /**
   * Avanza la última lección del estudiante en un grupo (solo a la siguiente).
   * `leccionIdx` es el índice lineal 1..40.
   */
  setProgress(horarioId: string, leccionIdx: number): Promise<void>;
}
