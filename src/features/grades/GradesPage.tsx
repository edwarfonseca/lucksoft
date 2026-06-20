import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Submission } from "@/domain/models/submission";
import { submissionRepository } from "@/app/services";
import { getStudentSubmissions } from "@/application/listSubmissions";
import { useAuth } from "@/features/auth/auth-context";
import { formatDateTime } from "@/lib/format";

/** "Mis notas" (vista del estudiante). Migra notas.html. */
export function GradesPage() {
  const { user } = useAuth();
  const [subs, setSubs] = useState<Submission[] | null>(null);

  useEffect(() => {
    if (user)
      getStudentSubmissions(submissionRepository, user.id).then(setSubs);
  }, [user]);

  return (
    <div className="page">
      <h1>Mis notas</h1>
      <p className="lead">
        Aquí ves la calificación de cada actividad que has entregado.
      </p>
      {subs === null ? (
        <p className="lead">Cargando…</p>
      ) : subs.length === 0 ? (
        <p className="empty">
          Aún no has entregado ninguna actividad. Ve a{" "}
          <Link to="/cursos">Cursos</Link>, resuelve una tarea y pulsa
          “Entregar”.
        </p>
      ) : (
        subs.map((s) => {
          const graded = s.grade !== null;
          return (
            <div className="grade-card" key={s.id}>
              <div className="grade-card-head">
                <h3>{s.activityTitle}</h3>
                {graded ? (
                  <span className="grade-pill">{s.grade}/100</span>
                ) : (
                  <span className="tag soon">Pendiente</span>
                )}
              </div>
              <p className="muted-line">
                Entregado: {formatDateTime(s.submittedAt)}
              </p>
              {s.comment && (
                <p className="comment">
                  <b>Comentario del docente:</b> {s.comment}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
