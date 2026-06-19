import {
  submitInputSchema,
  type Submission,
  type SubmitInput,
} from "@/domain/models/submission";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";

/**
 * Caso de uso: un estudiante entrega (o reenvía) una actividad.
 * Valida la entrada contra el esquema del dominio antes de persistir.
 */
export async function submitAssignment(
  repo: SubmissionRepository,
  input: SubmitInput,
): Promise<Submission> {
  const parsed = submitInputSchema.parse(input);
  return repo.submit(parsed);
}
