import type { AdminService } from "@/domain/ports/AdminService";
import type { Pago } from "@/domain/models/pago";

/** Caso de uso: historial de pagos (panel de admin). */
export function listPagos(service: AdminService): Promise<Pago[]> {
  return service.listPagos();
}
