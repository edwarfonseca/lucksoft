/**
 * Estructura de un curso: 10 periodos (un periodo = un mes) y 4 sesiones por
 * periodo (una sesión = una semana). En total 40 lecciones por curso.
 */
export const PERIODOS = 10;
export const SESIONES_POR_PERIODO = 4;
export const LECCIONES_TOTAL = PERIODOS * SESIONES_POR_PERIODO; // 40

/** Una lección concreta dentro de un curso. */
export interface Leccion {
  periodo: number;
  sesion: number;
}

/** Índice lineal (1..40) de una lección. */
export function toIndex(periodo: number, sesion: number): number {
  return (periodo - 1) * SESIONES_POR_PERIODO + sesion;
}

/** Lección (periodo/sesión) a partir de su índice lineal. */
export function fromIndex(idx: number): Leccion {
  const i = Math.min(LECCIONES_TOTAL, Math.max(1, idx));
  return {
    periodo: Math.floor((i - 1) / SESIONES_POR_PERIODO) + 1,
    sesion: ((i - 1) % SESIONES_POR_PERIODO) + 1,
  };
}

export type EstadoLeccion = "vista" | "actual" | "bloqueada";

/**
 * Estado de una lección según el avance (frontier = índice de la última lección
 * alcanzada) y si la clase está en curso ahora:
 * - "vista": ya la vio (idx <= frontier) → libre.
 * - "actual": es la siguiente (frontier+1) y hay clase ahora → se puede entrar.
 * - "bloqueada": el resto.
 */
export function estadoLeccion(
  idx: number,
  frontier: number,
  claseEnCurso: boolean,
): EstadoLeccion {
  if (idx <= frontier) return "vista";
  if (idx === frontier + 1 && claseEnCurso) return "actual";
  return "bloqueada";
}

/** Asegura que la lección esté dentro de los rangos válidos (1..10, 1..4). */
export function clampLeccion(l: Leccion): Leccion {
  return {
    periodo: Math.min(PERIODOS, Math.max(1, Math.trunc(l.periodo))),
    sesion: Math.min(SESIONES_POR_PERIODO, Math.max(1, Math.trunc(l.sesion))),
  };
}

/** ¿Son la misma lección? */
export function lessonsEqual(a: Leccion, b: Leccion): boolean {
  return a.periodo === b.periodo && a.sesion === b.sesion;
}

/** Lista de números 1..n (para iterar periodos/sesiones en la UI). */
export const rango = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i + 1);
