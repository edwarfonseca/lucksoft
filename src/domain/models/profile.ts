import { z } from "zod";
import { roleSchema } from "./user";

/** Roles que el panel puede crear (admin no se crea desde la UI). */
export const creatableRoleSchema = z.enum(["estudiante", "docente"]);
export type CreatableRole = z.infer<typeof creatableRoleSchema>;

/** Perfil completo que gestiona el administrador. */
export const managedProfileSchema = z.object({
  id: z.string(),
  role: roleSchema,
  nombres: z.string().nullable(),
  apellidos: z.string().nullable(),
  fullName: z.string(),
  edad: z.number().nullable(),
  activo: z.boolean(),
  // Solo estudiantes:
  curso: z.string().nullable(),
  creditosPagados: z.number(),
  nombreAcudiente: z.string().nullable(),
  numeroAcudiente: z.string().nullable(),
  pais: z.string().nullable(),
});
export type ManagedProfile = z.infer<typeof managedProfileSchema>;

/** Datos para crear una cuenta nueva (incluye credenciales de acceso). */
export interface CreateUserInput {
  username: string;
  password: string;
  role: CreatableRole;
  nombres: string;
  apellidos: string;
  edad: number | null;
  curso?: string | null;
  creditosPagados?: number;
  nombreAcudiente?: string | null;
  numeroAcudiente?: string | null;
  pais?: string | null;
}

/** Cambios al editar un perfil existente. */
export interface UpdateProfileInput {
  role?: CreatableRole;
  nombres?: string;
  apellidos?: string;
  edad?: number | null;
  activo?: boolean;
  curso?: string | null;
  creditosPagados?: number;
  nombreAcudiente?: string | null;
  numeroAcudiente?: string | null;
  pais?: string | null;
}
