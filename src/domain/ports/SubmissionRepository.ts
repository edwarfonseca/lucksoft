import type { Submission, SubmitInput } from "../models/submission";

/**
 * Port de persistencia de entregas. El dominio depende de esta interfaz, no de
 * una implementación concreta. Adaptadores: LocalSubmissionRepository
 * (localStorage) y, en la Fase 5, SupabaseSubmissionRepository.
 *
 * Las operaciones son asíncronas para que el cambio a Supabase no altere las
 * firmas (el adaptador local resuelve de inmediato).
 */
export interface SubmissionRepository {
  /** Todas las entregas, de la más reciente a la más antigua (vista docente). */
  getAll(): Promise<Submission[]>;

  /** Entregas de un estudiante concreto. */
  getByStudent(studentId: string): Promise<Submission[]>;

  /** Una entrega por id, o null si no existe. */
  getById(id: string): Promise<Submission | null>;

  /**
   * Crea o reemplaza la entrega del estudiante para esa actividad. Reenviar
   * reinicia la calificación a pendiente. Devuelve la entrega resultante.
   */
  submit(input: SubmitInput): Promise<Submission>;

  /** El docente califica una entrega. */
  grade(submissionId: string, grade: number, comment: string): Promise<void>;
}
