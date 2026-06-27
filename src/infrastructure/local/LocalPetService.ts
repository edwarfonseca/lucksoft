import { ENERGIA_MAX, type Comida, type Mascota } from "@/domain/models/pet";
import type { PetService } from "@/domain/ports/PetService";

const STORAGE_KEY = "lucksoft_mascota";

/** Catálogo fijo (espeja el seed de `0010_mascota.sql`). */
const COMIDAS: Comida[] = [
  { id: "manzana", nombre: "Manzana", emoji: "🍎", costo: 3, energia: 20 },
  { id: "sandwich", nombre: "Sándwich", emoji: "🥪", costo: 6, energia: 45 },
  { id: "pizza", nombre: "Pizza", emoji: "🍕", costo: 10, energia: 70 },
  {
    id: "pastel",
    nombre: "Pastel mágico",
    emoji: "🎂",
    costo: 15,
    energia: 100,
  },
];

/**
 * Mascota en localStorage para el modo sin backend (desarrollo/tests). Como aquí
 * no hay progreso ni notas reales, la energía no se drena sola y arranca con unas
 * monedas de demostración; alimentar gasta monedas y sube energía.
 */
export class LocalPetService implements PetService {
  private read(): Mascota {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "");
      if (raw && typeof raw === "object") {
        const m = raw as Partial<Mascota>;
        return {
          nombre: typeof m.nombre === "string" ? m.nombre : "Pixel",
          energia: typeof m.energia === "number" ? m.energia : ENERGIA_MAX,
          monedas: typeof m.monedas === "number" ? m.monedas : 30,
        };
      }
    } catch {
      /* primera vez / dato corrupto */
    }
    return { nombre: "Pixel", energia: ENERGIA_MAX, monedas: 30 };
  }

  private write(m: Mascota): Mascota {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
    return m;
  }

  async getMascota(): Promise<Mascota> {
    return this.read();
  }

  async getComidas(): Promise<Comida[]> {
    return COMIDAS;
  }

  async alimentar(comidaId: string): Promise<Mascota> {
    const m = this.read();
    const comida = COMIDAS.find((c) => c.id === comidaId);
    if (!comida) throw new Error("Comida desconocida");
    if (m.monedas < comida.costo) throw new Error("Monedas insuficientes");
    return this.write({
      ...m,
      energia: Math.min(ENERGIA_MAX, m.energia + comida.energia),
      monedas: m.monedas - comida.costo,
    });
  }

  async renombrar(nombre: string): Promise<Mascota> {
    const limpio = nombre.trim().slice(0, 24) || "Pixel";
    return this.write({ ...this.read(), nombre: limpio });
  }
}
