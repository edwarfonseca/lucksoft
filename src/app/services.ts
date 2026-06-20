import type { AuthService } from "@/domain/ports/AuthService";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import { LocalAuthService } from "@/infrastructure/local/LocalAuthService";
import { LocalSubmissionRepository } from "@/infrastructure/local/LocalSubmissionRepository";
import { SupabaseAuthService } from "@/infrastructure/supabase/SupabaseAuthService";
import { SupabaseSubmissionRepository } from "@/infrastructure/supabase/SupabaseSubmissionRepository";
import { isSupabaseConfigured } from "@/infrastructure/supabase/client";

/**
 * Raíz de composición: el ÚNICO lugar donde se decide qué implementación de cada
 * port se usa. Si hay credenciales de Supabase en .env, se usan sus adaptadores;
 * si no, se cae a los adaptadores `Local*` (localStorage) y la app funciona
 * igual que antes. La app consume siempre las interfaces, nunca las clases.
 */
export const usingSupabase = isSupabaseConfigured;

export const authService: AuthService = usingSupabase
  ? new SupabaseAuthService()
  : new LocalAuthService();

export const submissionRepository: SubmissionRepository = usingSupabase
  ? new SupabaseSubmissionRepository()
  : new LocalSubmissionRepository();
