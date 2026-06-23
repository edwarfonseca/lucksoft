/**
 * Estructura de un curso: 10 periodos (un periodo = un mes) y 4 sesiones por
 * periodo (una sesión = una semana). En total 40 lecciones por curso.
 */
export const PERIODOS = 10;
export const SESIONES_POR_PERIODO = 4;

/** Una lección concreta dentro de un curso. */
export interface Leccion {
  periodo: number;
  sesion: number;
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
