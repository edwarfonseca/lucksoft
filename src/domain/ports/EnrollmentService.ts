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

  /** Registra la última lección (periodo/sesión) del estudiante autenticado. */
  setProgress(periodo: number, sesion: number): Promise<void>;
}
