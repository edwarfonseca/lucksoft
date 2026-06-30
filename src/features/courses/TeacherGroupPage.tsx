import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCourse } from "@/courses/registry";
import { estadoCreditos, type ClaseHorario } from "@/domain/models/enrollment";
import {
  DIA_SEMANA_LABEL,
  formatHora,
  grupoNombre,
} from "@/domain/models/horario";
import type { GrupoEstudiante } from "@/domain/models/teacherGroup";
import { enrollmentService } from "@/app/services";
import { getGroupStudents } from "@/application/loadEnrollment";
import { useEnrollment } from "@/features/courses/enrollment-context";

/** Detalle de un grupo del docente: sus estudiantes y la info de cada uno. */
export function TeacherGroupPage() {
  const { horarioId } = useParams();
  const { teacherClasses, teacherLoading } = useEnrollment();

  // En modo local no hay grupos de docente.
  if (!enrollmentService) return <Navigate to="/cursos" replace />;
  if (teacherLoading)
    return (
      <div className="page">
        <p className="lead">Cargando…</p>
      </div>
    );

  const clase = teacherClasses.find((c) => c.horarioId === horarioId);
  if (!clase) return <Navigate to="/cursos" replace />;
  return <GrupoDetalle clase={clase} />;
}

function GrupoDetalle({ clase }: { clase: ClaseHorario }) {
  const [estudiantes, setEstudiantes] = useState<GrupoEstudiante[] | null>(
    null,
  );
  const [error, setError] = useState("");
  const [verInfo, setVerInfo] = useState<GrupoEstudiante | null>(null);

  useEffect(() => {
    let active = true;
    getGroupStudents(enrollmentService!, clase.horarioId)
      .then((e) => active && setEstudiantes(e))
      .catch((e) => {
        if (active)
          setError(e instanceof Error ? e.message : "Error al cargar");
      });
    return () => {
      active = false;
    };
  }, [clase.horarioId]);

  const course = getCourse(clase.curso);
  const franja = `${DIA_SEMANA_LABEL[clase.diaSemana]} a las ${formatHora(clase.horaInicio)}`;

  return (
    <div className="page">
      <p>
        <Link className="back-link" to="/cursos">
          ← Mis grupos
        </Link>
      </p>
      <h1>
        {course.icon} {grupoNombre(clase)}
      </h1>
      <p className="lead">
        {course.title} · {franja}
        {estudiantes
          ? ` · ${estudiantes.length} ${estudiantes.length === 1 ? "estudiante" : "estudiantes"}`
          : ""}
      </p>

      {error && <p className="error-msg">{error}</p>}

      {estudiantes === null && !error ? (
        <p className="lead">Cargando estudiantes…</p>
      ) : estudiantes && estudiantes.length === 0 ? (
        <p className="empty">Este grupo todavía no tiene estudiantes.</p>
      ) : (
        estudiantes && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Edad</th>
                  <th>Créditos</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e) => (
                  <tr key={e.id} className={e.activo ? "" : "inactive"}>
                    <td>{e.fullName || "—"}</td>
                    <td>{e.edad ?? "—"}</td>
                    <td>
                      <span
                        className={
                          "tag " +
                          (estadoCreditos(e.creditos) === "bloqueado"
                            ? "soon"
                            : "")
                        }
                      >
                        {e.creditos}
                      </span>
                    </td>
                    <td>{e.activo ? "Activo" : "Inactivo"}</td>
                    <td className="admin-actions">
                      <button
                        className="btn btn-ghost"
                        onClick={() => setVerInfo(e)}
                      >
                        Ver información
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {verInfo && (
        <StudentInfoModal
          estudiante={verInfo}
          onClose={() => setVerInfo(null)}
        />
      )}
    </div>
  );
}

/** Modal con la información completa del estudiante (seguimiento del docente). */
function StudentInfoModal({
  estudiante,
  onClose,
}: {
  estudiante: GrupoEstudiante;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Información de ${estudiante.fullName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2>{estudiante.fullName || "Estudiante"}</h2>
          <button className="modal-close" aria-label="Cerrar" onClick={onClose}>
            ✕
          </button>
        </div>
        <dl className="info-list">
          <dt>Edad</dt>
          <dd>{estudiante.edad ?? "—"}</dd>
          <dt>Créditos</dt>
          <dd>{estudiante.creditos}</dd>
          <dt>Acudiente</dt>
          <dd>{estudiante.nombreAcudiente || "—"}</dd>
          <dt>Teléfono de inscripción</dt>
          <dd>{estudiante.numeroAcudiente || "—"}</dd>
          <dt>País</dt>
          <dd>{estudiante.pais || "—"}</dd>
          <dt>Estado</dt>
          <dd>{estudiante.activo ? "Activo" : "Inactivo"}</dd>
        </dl>
      </div>
    </div>
  );
}
