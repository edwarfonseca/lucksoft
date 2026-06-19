import type { AuthService } from "@/domain/ports/AuthService";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import { LocalAuthService } from "@/infrastructure/local/LocalAuthService";
import { LocalSubmissionRepository } from "@/infrastructure/local/LocalSubmissionRepository";

/**
 * Raíz de composición: el ÚNICO lugar donde se decide qué implementación de cada
 * port se usa. La app consume siempre las interfaces (AuthService,
 * SubmissionRepository), nunca las clases concretas.
 *
 * En la Fase 5 basta sustituir aquí los adaptadores `Local*` por los de Supabase
 * (o elegir según una variable de entorno) sin tocar el resto del código.
 */
export const authService: AuthService = new LocalAuthService();
export const submissionRepository: SubmissionRepository =
  new LocalSubmissionRepository();
