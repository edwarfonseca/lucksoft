import { z } from "zod";

/** Rol del usuario dentro de la plataforma. */
export const roleSchema = z.enum(["docente", "estudiante", "admin"]);
export type Role = z.infer<typeof roleSchema>;

/**
 * Usuario del dominio. Es independiente de cómo se autentique (login falso
 * actual o Supabase en la Fase 5); cada adaptador mapea su formato a éste.
 */
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: roleSchema,
});
export type User = z.infer<typeof userSchema>;
