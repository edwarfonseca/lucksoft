import { z } from "zod";
import { courseKindSchema } from "./course";

/**
 * Día de la semana en convención Postgres EXTRACT(DOW): 0=Domingo … 6=Sábado.
 * Se usa el mismo número en la BD y en el cron de descuento de créditos.
 */
export const diaSemanaSchema = z.number().int().min(0).max(6);

export const DIA_SEMANA_LABEL: Record<number, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

/** Orden para mostrar selectores empezando en Lunes. */
export const DIAS_SEMANA: number[] = [1, 2, 3, 4, 5, 6, 0];

/**
 * Un horario es una clase semanal recurrente de 1 hora: un curso, un día y una
 * hora. Los estudiantes se asignan a un único horario (profile.horarioId).
 */
export const horarioSchema = z.object({
  id: z.string(),
  curso: courseKindSchema,
  diaSemana: diaSemanaSchema,
  /** Hora de inicio en formato "HH:MM". */
  horaInicio: z.string(),
  docenteId: z.string().nullable(),
  docenteNombre: z.string().nullable(),
  activo: z.boolean(),
});
export type Horario = z.infer<typeof horarioSchema>;

/** Datos para crear un horario. */
export interface CreateHorarioInput {
  curso: z.infer<typeof courseKindSchema>;
  diaSemana: number;
  horaInicio: string;
  docenteId: string | null;
}

/** Cambios al editar un horario. */
export interface UpdateHorarioInput {
  curso?: z.infer<typeof courseKindSchema>;
  diaSemana?: number;
  horaInicio?: string;
  docenteId?: string | null;
  activo?: boolean;
}

/** Normaliza "HH:MM:SS" (Postgres) o "HH:MM" a "HH:MM" para mostrar. */
export function formatHora(hora: string): string {
  return hora.slice(0, 5);
}
