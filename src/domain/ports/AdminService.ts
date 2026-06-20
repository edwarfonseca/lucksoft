import type {
  CreateUserInput,
  ManagedProfile,
  UpdateProfileInput,
} from "../models/profile";

/**
 * Port de administración de usuarios. Solo lo implementa el adaptador de
 * Supabase (crear/borrar usan Edge Functions con service_role en el servidor).
 */
export interface AdminService {
  /** Lista todos los perfiles (solo accesible para admin vía RLS). */
  listProfiles(): Promise<ManagedProfile[]>;

  /** Crea una cuenta (estudiante o docente) con sus datos. */
  createUser(input: CreateUserInput): Promise<void>;

  /** Edita los datos de un perfil existente. */
  updateProfile(id: string, changes: UpdateProfileInput): Promise<void>;

  /** Elimina una cuenta por completo. */
  deleteUser(id: string): Promise<void>;
}
