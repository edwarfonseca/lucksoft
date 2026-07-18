import { useCallback, useEffect, useMemo, useState } from "react";
import { pagosDelMes, resumenPagos, type Pago } from "@/domain/models/pago";
import type { adminService } from "@/app/services";
import { listPagos } from "@/application/adminPagos";

/** Fecha corta en horario local, p. ej. "11 jul 2026, 3:45 p. m.". */
function formatFecha(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Historial de pagos: cada aumento de créditos de un estudiante equivale a un
 * pago del acudiente (lo registra un trigger en la base de datos, migración
 * 0017). Muestra el histórico completo con resumen del mes actual.
 */
export function PagosPanel({
  service,
}: {
  service: NonNullable<typeof adminService>;
}) {
  const [pagos, setPagos] = useState<Pago[] | null>(null);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");

  const load = useCallback(() => {
    listPagos(service)
      .then((ps) => {
        setPagos(ps);
        setError("");
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "No se pudo cargar."),
      );
  }, [service]);
  useEffect(() => load(), [load]);

  const visibles = useMemo(() => {
    if (!pagos) return [];
    const q = filtro.trim().toLowerCase();
    return q
      ? pagos.filter((p) => p.estudiante.toLowerCase().includes(q))
      : pagos;
  }, [pagos, filtro]);

  if (error) return <p className="error-msg">{error}</p>;
  if (pagos === null) return <p className="lead">Cargando pagos…</p>;

  const hoy = new Date();
  const mes = resumenPagos(
    pagosDelMes(pagos, hoy.getFullYear(), hoy.getMonth()),
  );
  const total = resumenPagos(pagos);
  const nombreMes = hoy.toLocaleString("es-CO", { month: "long" });

  return (
    <>
      <div className="admin-head">
        <h2>Pagos</h2>
        <input
          className="task-select"
          type="search"
          placeholder="Buscar estudiante…"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          aria-label="Buscar estudiante en el historial de pagos"
        />
      </div>

      <p className="notice">
        Cada vez que se le suman créditos a un estudiante queda registrado aquí
        como un pago (lo hace la base de datos automáticamente). Los descuentos
        por clases no aparecen: son consumo, no pagos.
      </p>

      <div className="stats-resumen">
        <span className="tag ready">
          📅 {nombreMes}: <b>{mes.totalPagos}</b> pago(s) ·{" "}
          <b>{mes.totalCreditos}</b> créditos
        </span>
        <span className="tag">
          🧾 Histórico: <b>{total.totalPagos}</b> pago(s) ·{" "}
          <b>{total.totalCreditos}</b> créditos
        </span>
      </div>

      {visibles.length === 0 ? (
        <p className="empty">
          {pagos.length === 0
            ? "Aún no hay pagos registrados. Aparecerán cuando le sumes créditos a un estudiante."
            : "Ningún pago coincide con la búsqueda."}
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Estudiante</th>
                <th>Créditos</th>
                <th>Saldo después</th>
                <th>Registrado por</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((p) => (
                <tr key={p.id}>
                  <td>{formatFecha(p.fecha)}</td>
                  <td>{p.estudiante || "—"}</td>
                  <td>
                    <span className="tag ready">+{p.creditos}</span>
                  </td>
                  <td>{p.saldoDespues}</td>
                  <td>{p.registradoPor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
