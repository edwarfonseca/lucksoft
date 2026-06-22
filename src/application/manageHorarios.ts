import type {
  CreateHorarioInput,
  Horario,
  UpdateHorarioInput,
} from "@/domain/models/horario";
import type { AdminService } from "@/domain/ports/AdminService";

/** Casos de uso de horarios de clase (delegan en el AdminService inyectado). */

export function listHorarios(admin: AdminService): Promise<Horario[]> {
  return admin.listHorarios();
}

export function createHorario(
  admin: AdminService,
  input: CreateHorarioInput,
): Promise<void> {
  return admin.createHorario(input);
}

export function updateHorario(
  admin: AdminService,
  id: string,
  changes: UpdateHorarioInput,
): Promise<void> {
  return admin.updateHorario(id, changes);
}

export function deleteHorario(admin: AdminService, id: string): Promise<void> {
  return admin.deleteHorario(id);
}

/** Ejecuta a mano el descuento de créditos de hoy. Devuelve nº de afectados. */
export function consumeCreditsToday(admin: AdminService): Promise<number> {
  return admin.consumeCreditsToday();
}
