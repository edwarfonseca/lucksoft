import type {
  ClaseHorario,
  Enrollment,
  TeacherStudent,
} from "../models/enrollment";
import type { GrupoEstudiante } from "../models/teacherGroup";

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
   * Estudiantes inscritos en los grupos que dicta el docente autenticado (con el
   * curso de cada grupo). Lo usa "Calificar" para mostrar solo a sus estudiantes.
   */
  getTeacherStudents(): Promise<TeacherStudent[]>;

  /**
   * Estudiantes de un grupo concreto del docente, con datos de seguimiento
   * (créditos, acudiente, edad). Solo funciona si el grupo es del docente.
   */
  getGroupStudents(horarioId: string): Promise<GrupoEstudiante[]>;

  /**
   * Avanza la última lección del estudiante en un grupo (solo a la siguiente).
   * `leccionIdx` es el índice lineal 1..40.
   */
  setProgress(horarioId: string, leccionIdx: number): Promise<void>;
}
