import {
  DIA_SEMANA_LABEL,
  formatHora,
  type Horario,
} from "@/domain/models/horario";
import type { CourseKind } from "@/domain/models/course";
import { getCourse } from "@/courses/registry";

/** Etiqueta legible de un horario, ej. "Python — Lunes 17:00". */
export function horarioLabel(h: Horario): string {
  const title = getCourse(h.curso as CourseKind).title;
  return `${title} — ${DIA_SEMANA_LABEL[h.diaSemana]} ${formatHora(h.horaInicio)}`;
}
