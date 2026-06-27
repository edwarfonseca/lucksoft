/**
 * Mascota virtual del estudiante (tamagotchi educativo). Hay UNA mascota por
 * estudiante. Cada lección que avanza le baja la energía; si llega a 0 "muere"
 * (revive al alimentarla). La comida se compra con monedas que se ganan según la
 * calificación de las actividades.
 *
 * Este módulo es lógica de dominio pura (sin React ni red): la fuente de verdad
 * en producción es Supabase (ver `0010_mascota.sql`); aquí viven los tipos y las
 * reglas para mostrar el estado y, en modo local, simularlo.
 */

/** Energía máxima de la mascota. */
export const ENERGIA_MAX = 100;

/**
 * Energía que pierde la mascota por cada lección avanzada. Con 34, tres
 * lecciones sin alimentar la llevan de 100 → 66 → 32 → 0 (muerta). Debe coincidir
 * con `mascota_drenaje()` en la migración.
 */
export const ENERGIA_POR_LECCION = 34;

/** Estado de la mascota tal como lo necesita la interfaz. */
export interface Mascota {
  nombre: string;
  /** 0..100. */
  energia: number;
  /** Monedas gastables (saldo). */
  monedas: number;
}

/** Una comida de la tienda. */
export interface Comida {
  id: string;
  nombre: string;
  emoji: string;
  /** Costo en monedas. */
  costo: number;
  /** Energía que devuelve (1..100). */
  energia: number;
}

/** Cómo de bien está la mascota, derivado de su energía. */
export type EstadoMascotaKey = "feliz" | "hambre" | "critica" | "muerta";

interface EstadoMascotaInfo {
  key: EstadoMascotaKey;
  label: string;
  emoji: string;
  mensaje: string;
  /** Clase CSS para teñir la barra/tarjeta. */
  clase: string;
}

export const ESTADO_MASCOTA: Record<EstadoMascotaKey, EstadoMascotaInfo> = {
  feliz: {
    key: "feliz",
    label: "Feliz",
    emoji: "😸",
    mensaje: "¡Me siento genial! Gracias por cuidarme 💚",
    clase: "pet-feliz",
  },
  hambre: {
    key: "hambre",
    label: "Con hambre",
    emoji: "🙀",
    mensaje: "Tengo un poco de hambre… ¿me das algo de comer?",
    clase: "pet-hambre",
  },
  critica: {
    key: "critica",
    label: "¡Pide comida!",
    emoji: "😿",
    mensaje: "¡Por favor, dame de comer pronto o me quedaré sin energía!",
    clase: "pet-critica",
  },
  muerta: {
    key: "muerta",
    label: "Sin energía",
    emoji: "💀",
    mensaje: "Me quedé sin energía… ¡aliméntame para revivir!",
    clase: "pet-muerta",
  },
};

/** Devuelve el estado de la mascota a partir de su energía (0..100). */
export function estadoMascota(energia: number): EstadoMascotaInfo {
  if (energia <= 0) return ESTADO_MASCOTA.muerta;
  if (energia <= 33) return ESTADO_MASCOTA.critica;
  if (energia <= 66) return ESTADO_MASCOTA.hambre;
  return ESTADO_MASCOTA.feliz;
}

/** Monedas que otorga una entrega calificada: nota / 10 (90 → 9, 100 → 10). */
export function monedasPorNota(nota: number): number {
  return Math.floor(Math.max(0, Math.min(100, nota)) / 10);
}

/** ¿Alcanzan las monedas para comprar esta comida? */
export function puedeComprar(mascota: Mascota, comida: Comida): boolean {
  return mascota.monedas >= comida.costo;
}
