import { useCallback, useEffect, useState } from "react";
import type { ManagedProfile } from "@/domain/models/profile";
import { grupoNombre } from "@/domain/models/horario";
import { extremosEntregas, type GrupoEntregas } from "@/domain/models/stats";
import type { adminService } from "@/app/services";
import { listProfiles } from "@/application/manageUsers";
import { getGroupSubmissionStats } from "@/application/adminStats";

/** Umbral de créditos por debajo del cual se hace seguimiento al estudiante. */
const CREDITOS_SEGUIMIENTO = 3;

/**
 * Estadísticas del panel de admin: qué grupos entregan más y menos tareas, y los
 * estudiantes con créditos bajos para hacerles seguimiento.
 */
export function StatsPanel({
  service,
}: {
  service: NonNullable<typeof adminService>;
}) {
  const [grupos, setGrupos] = useState<GrupoEntregas[] | null>(null);
  const [profiles, setProfiles] = useState<ManagedProfile[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    Promise.all([getGroupSubmissionStats(service), listProfiles(service)])
      .then(([gs, ps]) => {
        setGrupos(gs);
        setProfiles(ps);
        setError("");
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "No se pudieron cargar."),
      );
  }, [service]);
  useEffect(() => load(), [load]);

  if (error) return <p className="error-msg">{error}</p>;
  if (grupos === null || profiles === null)
    return <p className="lead">Cargando estadísticas…</p>;

  // Grupos ordenados de más a menos entregas; extremos para el resumen.
  const ordenados = [...grupos].sort((a, b) => b.entregas - a.entregas);
  const { mas, menos } = extremosEntregas(grupos);

  // Estudiantes con menos de 3 créditos, de menor a mayor (seguimiento).
  const bajos = profiles
    .filter(
      (p) =>
        p.role === "estudiante" && p.creditosPagados < CREDITOS_SEGUIMIENTO,
    )
    .sort((a, b) => a.creditosPagados - b.creditosPagados);

  return (
    <>
      <h2>Estadísticas</h2>

      <section className="stats-section">
        <h3>Entregas por grupo</h3>
        {mas && menos && (
          <div className="stats-resumen">
            <span className="tag ready">
              🔼 Más activo: <b>{grupoNombre(mas)}</b> · {mas.entregas} entregas
            </span>
            <span className="tag soon">
              🔽 Menos activo: <b>{grupoNombre(menos)}</b> · {menos.entregas}{" "}
              entregas
            </span>
          </div>
        )}
        {ordenados.length === 0 ? (
          <p className="empty">No hay grupos creados todavía.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Docente</th>
                  <th>Estudiantes</th>
                  <th>Lecciones</th>
                  <th>Entregas / total</th>
                </tr>
              </thead>
              <tbody>
                {ordenados.map((g) => {
                  const pct =
                    g.esperadas > 0
                      ? Math.round((g.entregas / g.esperadas) * 100)
                      : null;
                  return (
                    <tr key={g.horarioId}>
                      <td>{grupoNombre(g)}</td>
                      <td>{g.docente || "Sin docente"}</td>
                      <td>{g.estudiantes}</td>
                      <td>{g.lecciones}</td>
                      <td>
                        {g.entregas} / {g.esperadas}
                        {pct !== null && (
                          <span className="muted"> ({pct}%)</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="stats-section">
        <h3>Seguimiento: créditos bajos (menos de {CREDITOS_SEGUIMIENTO})</h3>
        {bajos.length === 0 ? (
          <p className="empty">
            Ningún estudiante tiene menos de {CREDITOS_SEGUIMIENTO} créditos. 👌
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Grupos</th>
                  <th>Créditos</th>
                  <th>Acudiente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {bajos.map((p) => (
                  <tr key={p.id} className={p.activo ? "" : "inactive"}>
                    <td>{p.fullName || "—"}</td>
                    <td>
                      {p.grupos.length
                        ? p.grupos.map((g) => grupoNombre(g)).join(", ")
                        : "Sin asignar"}
                    </td>
                    <td>
                      <span
                        className={
                          "tag " + (p.creditosPagados <= 0 ? "soon" : "")
                        }
                      >
                        {p.creditosPagados}
                      </span>
                    </td>
                    <td>
                      {p.nombreAcudiente
                        ? `${p.nombreAcudiente}${p.numeroAcudiente ? " · " + p.numeroAcudiente : ""}`
                        : "—"}
                    </td>
                    <td>{p.activo ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
