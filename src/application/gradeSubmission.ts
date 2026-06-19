import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";

/** Error de validación de negocio (entrada inválida del usuario). */
export class ValidationError extends Error {}

/**
 * Caso de uso: el docente califica una entrega.
 * Regla de negocio: la nota debe ser un entero entre 0 y 100.
 */
export async function gradeSubmission(
  repo: SubmissionRepository,
  submissionId: string,
  grade: number,
  comment: string,
): Promise<void> {
  if (!Number.isInteger(grade) || grade < 0 || grade > 100) {
    throw new ValidationError("La nota debe ser un entero entre 0 y 100.");
  }
  await repo.grade(submissionId, grade, comment.trim());
}
