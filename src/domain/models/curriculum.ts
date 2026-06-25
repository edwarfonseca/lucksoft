/**
 * Modelo del currículo gamificado de un curso. Un curso tiene 10 periodos y
 * cada periodo 4 sesiones (ver `lessons.ts`). Aquí vive la *forma* del contenido
 * pedagógico de cada sesión; el contenido concreto de cada curso se escribe en
 * `courses/<curso>/curriculum.ts`.
 *
 * Cada clase dura 90 minutos. La metodología es 70% práctica/proyectos, 20%
 * explicación guiada y 10% teoría, por lo que la `agenda` de cada sesión reparte
 * esos 90 minutos priorizando la práctica.
 */

/** Nivel de dificultad pedagógico (etiqueta para el estudiante). */
export type Nivel = "principiante" | "intermedio" | "avanzado";

export const NIVEL_LABEL: Record<Nivel, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

/** Tipo de sesión según la estructura fija de cada periodo. */
export type TipoSesion = "introduccion" | "practica" | "retos" | "mision";

export const TIPO_SESION_LABEL: Record<TipoSesion, string> = {
  introduccion: "Conceptos nuevos",
  practica: "Práctica guiada",
  retos: "Retos y desafíos",
  mision: "Misión final",
};

/** Bloque de la agenda de la sesión, con su tiempo estimado (en minutos). */
export interface BloqueAgenda {
  nombre: string;
  minutos: number;
  detalle: string;
}

/** Un reto de programación con su nivel de dificultad. */
export interface Reto {
  titulo: string;
  nivel: Nivel;
  consigna: string;
}

/** Mini proyecto / misión que cierra la sesión. */
export interface Cierre {
  titulo: string;
  descripcion: string;
}

/** Contenido completo de una sesión (90 minutos). */
export interface SesionContenido {
  /** 1..4 dentro del periodo. */
  numero: number;
  titulo: string;
  tipo: TipoSesion;
  nivel: Nivel;
  /** 1. Objetivo de aprendizaje. */
  objetivo: string;
  /** 2. Conceptos que se enseñan. */
  conceptos: string[];
  /** 3 + 7. Ejercicios/actividades con su tiempo estimado (suma ≈ 90 min). */
  agenda: BloqueAgenda[];
  /** 3. Ejercicios prácticos cortos. */
  ejercicios: string[];
  /** 4. Entre 3 y 5 retos de programación. */
  retos: Reto[];
  /** 5. Mini proyecto o misión final. */
  cierre: Cierre;
  /** 6. Criterios de evaluación. */
  evaluacion: string[];
  /** 8. Recomendaciones pedagógicas (10–17 años). */
  recomendaciones: string[];
  /** 10. Recompensa de la sesión (XP, trofeo, logro…). */
  recompensa: string;
}

/** Insignia que se desbloquea al completar un periodo. */
export interface Insignia {
  emoji: string;
  nombre: string;
}

/** Contenido de un periodo: 4 sesiones + metadata de gamificación. */
export interface PeriodoContenido {
  /** 1..10. */
  numero: number;
  titulo: string;
  descripcion: string;
  /** Nombre del proyecto del periodo (sesión 4). */
  proyecto: string;
  /** Insignia que se gana al completar el periodo. */
  insignia: Insignia;
  /** XP total que otorga el periodo. */
  xp: number;
  sesiones: SesionContenido[];
}

/** Un currículo completo = 10 periodos. */
export type Curriculum = PeriodoContenido[];

/** Devuelve el contenido de una sesión, o undefined si no existe. */
export function getSesionContenido(
  curriculum: Curriculum,
  periodo: number,
  sesion: number,
): SesionContenido | undefined {
  return curriculum
    .find((p) => p.numero === periodo)
    ?.sesiones.find((s) => s.numero === sesion);
}

/** Suma los minutos de la agenda (para validar/mostrar la duración). */
export function duracionTotal(sesion: SesionContenido): number {
  return sesion.agenda.reduce((acc, b) => acc + b.minutos, 0);
}
