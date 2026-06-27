import type { Comida, Mascota } from "../models/pet";

/**
 * Port de la mascota virtual. La implementación de Supabase recalcula energía y
 * monedas en el servidor (progreso + notas); la local las simula en memoria.
 */
export interface PetService {
  /** Estado actual de la mascota del estudiante (sincroniza el hambre). */
  getMascota(): Promise<Mascota>;

  /** Catálogo de comidas de la tienda. */
  getComidas(): Promise<Comida[]>;

  /** Compra una comida y se la da a la mascota; devuelve el estado nuevo. */
  alimentar(comidaId: string): Promise<Mascota>;

  /** Cambia el nombre de la mascota; devuelve el estado nuevo. */
  renombrar(nombre: string): Promise<Mascota>;
}
