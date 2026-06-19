import { z } from "zod";

/** Tipos de curso. Coincide con el `kind` de una entrega. */
export const courseKindSchema = z.enum(["python", "web", "scratch"]);
export type CourseKind = z.infer<typeof courseKindSchema>;

/** Nivel de dificultad de una tarea. */
export const difficultySchema = z.enum(["facil", "media", "dificil"]);
export type Difficulty = z.infer<typeof difficultySchema>;

/** Etiquetas legibles para la dificultad (UI). */
export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  facil: "Fácil",
  media: "Media",
  dificil: "Difícil",
};

/**
 * Definición de una tarea/actividad de un curso. El contenido concreto de cada
 * curso (enunciados, plantillas) vive en `courses/` (Fase 3).
 */
export interface Assignment {
  id: string;
  titulo: string;
  dificultad: Difficulty;
  enunciado: string;
}
