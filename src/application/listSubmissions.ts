import type { CourseKind } from "@/domain/models/course";
import type { Submission } from "@/domain/models/submission";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";

/** Caso de uso: todas las entregas (vista del docente). */
export function getAllSubmissions(
  repo: SubmissionRepository,
): Promise<Submission[]> {
  return repo.getAll();
}

/**
 * Caso de uso: entregas de un curso concreto (vista del docente por curso). El
 * `kind` de la entrega ES el curso (python/web/scratch).
 */
export async function getSubmissionsByCourse(
  repo: SubmissionRepository,
  kind: CourseKind,
): Promise<Submission[]> {
  const all = await repo.getAll();
  return all.filter((s) => s.kind === kind);
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
