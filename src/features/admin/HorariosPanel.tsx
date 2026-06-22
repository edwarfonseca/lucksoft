import { useCallback, useEffect, useState } from "react";
import {
  DIA_SEMANA_LABEL,
  formatHora,
  type Horario,
} from "@/domain/models/horario";
import type { ManagedProfile } from "@/domain/models/profile";
import type { CourseKind } from "@/domain/models/course";
import type { AdminService } from "@/domain/ports/AdminService";
import { listProfiles } from "@/application/manageUsers";
import {
  consumeCreditsToday,
  deleteHorario,
  listHorarios,
} from "@/application/manageHorarios";
import { getCourse } from "@/courses/registry";
import { HorarioForm } from "@/features/admin/HorarioForm";

interface Props {
  service: AdminService;
}

/** Pestaña de horarios: gestiona las clases semanales y el descuento manual. */
export function HorariosPanel({ service }: Props) {
  const [horarios, setHorarios] = useState<Horario[] | null>(null);
  const [docentes, setDocentes] = useState<ManagedProfile[]>([]);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [editing, setEditing] = useState<Horario | "new" | null>(null);

  const load = useCallback(() => {
    Promise.all([listHorarios(service), listProfiles(service)])
      .then(([hs, profiles]) => {
        setHorarios(hs);
        setDocentes(profiles.filter((p) => p.role === "docente"));
        setError("");
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "No se pudo cargar."),
      );
  }, [service]);
  useEffect(() => load(), [load]);

  async function onDelete(h: Horario) {
    if (
      !confirm(
        "¿Eliminar este horario? Los estudiantes asignados quedarán sin horario.",
      )
    )
      return;
    try {
      await deleteHorario(service, h.id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar.");
    }
  }

  async function onConsume() {
    if (!confirm("¿Descontar 1 crédito a los estudiantes con clase hoy?"))
      return;
    setError("");
    setInfo("");
    try {
      const n = await consumeCreditsToday(service);
      setInfo(
        n === 0
          ? "Hoy no había clases con estudiantes por descontar."
          : `Descuento aplicado: ${n} estudiante(s) afectado(s).`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo ejecutar.");
    }
  }

  if (editing) {
    return (
      <HorarioForm
        service={service}
        docentes={docentes}
        initial={editing === "new" ? undefined : editing}
        onSaved={() => {
          setEditing(null);
          load();
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <>
      <div className="admin-head">
        <h2>Horarios de clase</h2>
        <div className="admin-head-actions">
          <button className="btn btn-ghost" onClick={onConsume}>
            Descontar créditos de hoy
          </button>
          <button className="btn btn-primary" onClick={() => setEditing("new")}>
            + Nuevo horario
          </button>
        </div>
      </div>

      <p className="notice">
        Cada horario es una clase de 1 hora por semana. El descuento de créditos
        ocurre automáticamente cada semana el día de la clase; el botón de
        arriba permite ejecutarlo a mano para hoy.
      </p>

      {error && <p className="error-msg">{error}</p>}
      {info && <p className="ok-msg">{info}</p>}

      {horarios === null ? (
        <p className="lead">Cargando…</p>
      ) : horarios.length === 0 ? (
        <p className="empty">No hay horarios todavía.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Día</th>
                <th>Hora</th>
                <th>Docente</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((h) => (
                <tr key={h.id} className={h.activo ? "" : "inactive"}>
                  <td>{getCourse(h.curso as CourseKind).title}</td>
                  <td>{DIA_SEMANA_LABEL[h.diaSemana]}</td>
                  <td>{formatHora(h.horaInicio)}</td>
                  <td>{h.docenteNombre || "—"}</td>
                  <td>{h.activo ? "Activo" : "Inactivo"}</td>
                  <td className="admin-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setEditing(h)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-ghost danger"
                      onClick={() => onDelete(h)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
