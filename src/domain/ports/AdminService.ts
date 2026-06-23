import type {
  CreateUserInput,
  ManagedProfile,
  UpdateCredentialsInput,
  UpdateProfileInput,
} from "../models/profile";
import type {
  CreateHorarioInput,
  Horario,
  UpdateHorarioInput,
} from "../models/horario";

/**
 * Port de administración. Solo lo implementa el adaptador de Supabase
 * (crear/borrar cuentas usan Edge Functions con service_role en el servidor;
 * los horarios son datos normales protegidos por RLS de admin).
 */
export interface AdminService {
  /** Lista todos los perfiles (solo accesible para admin vía RLS). */
  listProfiles(): Promise<ManagedProfile[]>;

  /** Crea una cuenta (estudiante o docente) con sus datos. */
  createUser(input: CreateUserInput): Promise<void>;

  /** Edita los datos de un perfil existente. */
  updateProfile(id: string, changes: UpdateProfileInput): Promise<void>;

  /** Cambia el usuario (login) y/o la contraseña de una cuenta. */
  updateCredentials(id: string, changes: UpdateCredentialsInput): Promise<void>;

  /**
   * Define en qué grupos (horarios) está inscrito un estudiante. Conserva el
   * progreso de los que ya tenía y crea/elimina según la nueva selección.
   */
  setEnrollments(studentId: string, horarioIds: string[]): Promise<void>;

  /** Elimina una cuenta por completo. */
  deleteUser(id: string): Promise<void>;

  /** Lista los horarios de clase (con el nombre del docente si lo tiene). */
  listHorarios(): Promise<Horario[]>;

  /** Crea un horario de clase semanal. */
  createHorario(input: CreateHorarioInput): Promise<void>;

  /** Edita un horario existente. */
  updateHorario(id: string, changes: UpdateHorarioInput): Promise<void>;

  /** Elimina un horario (los estudiantes asignados quedan sin horario). */
  deleteHorario(id: string): Promise<void>;

  /**
   * Ejecuta a mano el descuento de créditos del día de hoy (mismo cálculo que el
   * cron semanal). Devuelve cuántos estudiantes fueron afectados.
   */
  consumeCreditsToday(): Promise<number>;
}
