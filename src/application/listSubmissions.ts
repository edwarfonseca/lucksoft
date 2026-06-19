import type { Submission } from "@/domain/models/submission";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";

/** Caso de uso: todas las entregas (vista del docente). */
export function getAllSubmissions(
  repo: SubmissionRepository,
): Promise<Submission[]> {
  return repo.getAll();
}

/** Caso de uso: entregas y notas de un estudiante (vista "Mis notas"). */
export function getStudentSubmissions(
  repo: SubmissionRepository,
  studentId: string,
): Promise<Submission[]> {
  return repo.getByStudent(studentId);
}

/** Caso de uso: una entrega concreta (p. ej. para revisarla). */
export function getSubmissionById(
  repo: SubmissionRepository,
  id: string,
): Promise<Submission | null> {
  return repo.getById(id);
}
