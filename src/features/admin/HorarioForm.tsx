import { useState, type FormEvent } from "react";
import {
  DIAS_SEMANA,
  DIA_SEMANA_LABEL,
  formatHora,
  type CreateHorarioInput,
  type Horario,
  type UpdateHorarioInput,
} from "@/domain/models/horario";
import type { CourseKind } from "@/domain/models/course";
import type { ManagedProfile } from "@/domain/models/profile";
import type { AdminService } from "@/domain/ports/AdminService";
import { createHorario, updateHorario } from "@/application/manageHorarios";
import { courseList } from "@/courses/registry";

interface Props {
  service: AdminService;
  docentes: ManagedProfile[];
  /** Si viene, es edición; si no, es alta. */
  initial?: Horario;
  onSaved: () => void;
  onCancel: () => void;
}

interface FormState {
  curso: CourseKind;
  diaSemana: number;
  horaInicio: string;
  docenteId: string;
  activo: boolean;
}

function initialState(h?: Horario): FormState {
  return {
    curso: (h?.curso ?? courseList[0].kind) as CourseKind,
    diaSemana: h?.diaSemana ?? 1,
    horaInicio: h ? formatHora(h.horaInicio) : "17:00",
    docenteId: h?.docenteId ?? "",
    activo: h?.activo ?? true,
  };
}

export function HorarioForm({
  service,
  docentes,
  initial,
  onSaved,
  onCancel,
}: Props) {
  const isEdit = !!initial;
  const [f, setF] = useState<FormState>(() => initialState(initial));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const docenteId = f.docenteId || null;
      if (isEdit && initial) {
        const changes: UpdateHorarioInput = {
          curso: f.curso,
          diaSemana: f.diaSemana,
          horaInicio: f.horaInicio,
          docenteId,
          activo: f.activo,
        };
        await updateHorario(service, initial.id, changes);
      } else {
        const input: CreateHorarioInput = {
          curso: f.curso,
          diaSemana: f.diaSemana,
          horaInicio: f.horaInicio,
          docenteId,
        };
        await createHorario(service, input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{isEdit ? "Editar horario" : "Nuevo horario"}</h2>

      <div className="form-grid">
        <label>
          Curso
          <select
            value={f.curso}
            onChange={(e) => set("curso", e.target.value as CourseKind)}
          >
            {courseList.map((c) => (
              <option key={c.kind} value={c.kind}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Día de la semana
          <select
            value={f.diaSemana}
            onChange={(e) => set("diaSemana", Number(e.target.value))}
          >
            {DIAS_SEMANA.map((d) => (
              <option key={d} value={d}>
                {DIA_SEMANA_LABEL[d]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Hora de inicio
          <input
            type="time"
            value={f.horaInicio}
            onChange={(e) => set("horaInicio", e.target.value)}
          />
        </label>

        <label>
          Docente (opcional)
          <select
            value={f.docenteId}
            onChange={(e) => set("docenteId", e.target.value)}
          >
            <option value="">— Sin asignar —</option>
            {docentes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.fullName || "(sin nombre)"}
              </option>
            ))}
          </select>
        </label>

        {isEdit && (
          <label className="checkbox">
            <input
              type="checkbox"
              checked={f.activo}
              onChange={(e) => set("activo", e.target.checked)}
            />
            Activo
          </label>
        )}
      </div>

      <p className="notice">
        Cada horario es una clase de 1 hora por semana. El día de la clase se
        descuenta 1 crédito a cada estudiante activo asignado.
      </p>

      {error && <p className="error-msg">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear horario"}
        </button>
      </div>
    </form>
  );
}
