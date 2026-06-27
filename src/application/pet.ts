import type { Comida, Mascota } from "@/domain/models/pet";
import type { PetService } from "@/domain/ports/PetService";

/** Casos de uso de la mascota (delegan en el PetService inyectado). */

export function getMascota(service: PetService): Promise<Mascota> {
  return service.getMascota();
}

export function getComidas(service: PetService): Promise<Comida[]> {
  return service.getComidas();
}

export function alimentarMascota(
  service: PetService,
  comidaId: string,
): Promise<Mascota> {
  return service.alimentar(comidaId);
}

export function renombrarMascota(
  service: PetService,
  nombre: string,
): Promise<Mascota> {
  return service.renombrar(nombre);
}
