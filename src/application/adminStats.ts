import type { AdminService } from "@/domain/ports/AdminService";
import type { GrupoEntregas } from "@/domain/models/stats";

/** Caso de uso: entregas por grupo (estadísticas del panel de admin). */
export function getGroupSubmissionStats(
  service: AdminService,
): Promise<GrupoEntregas[]> {
  return service.getGroupSubmissionStats();
}
