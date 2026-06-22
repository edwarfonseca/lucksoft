import {
  DIA_SEMANA_LABEL,
  formatHora,
  grupoNombre,
  type Horario,
} from "@/domain/models/horario";

/** Etiqueta legible de un horario, ej. "Python1 — Lunes 17:00". */
export function horarioLabel(h: Horario): string {
  return `${grupoNombre(h)} — ${DIA_SEMANA_LABEL[h.diaSemana]} ${formatHora(h.horaInicio)}`;
}
