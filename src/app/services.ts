import type { AuthService } from "@/domain/ports/AuthService";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import type { AdminService } from "@/domain/ports/AdminService";
import type { EnrollmentService } from "@/domain/ports/EnrollmentService";
import { LocalAuthService } from "@/infrastructure/local/LocalAuthService";
import { LocalSubmissionRepository } from "@/infrastructure/local/LocalSubmissionRepository";
import { SupabaseAuthService } from "@/infrastructure/supabase/SupabaseAuthService";
import { SupabaseSubmissionRepository } from "@/infrastructure/supabase/SupabaseSubmissionRepository";
import { SupabaseAdminService } from "@/infrastructure/supabase/SupabaseAdminService";
import { SupabaseEnrollmentService } from "@/infrastructure/supabase/SupabaseEnrollmentService";
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

// La administración de usuarios solo existe con Supabase (necesita auth real y
// las Edge Functions). En modo local es null y el panel muestra un aviso.
export const adminService: AdminService | null = usingSupabase
  ? new SupabaseAdminService()
  : null;

// La inscripción (curso/créditos/horario propios) requiere auth real; en modo
// local es null y la vista de cursos no aplica restricciones.
export const enrollmentService: EnrollmentService | null = usingSupabase
  ? new SupabaseEnrollmentService()
  : null;
