import { useCallback, useEffect, useState } from "react";
import type { Submission } from "@/domain/models/submission";
import { submissionRepository } from "@/app/services";
import { getAllSubmissions } from "@/application/listSubmissions";
import { GradeCard } from "@/features/grading/GradeCard";

/** "Calificar" (vista del docente). Migra calificar.html. */
export function GradingPage() {
  const [subs, setSubs] = useState<Submission[] | null>(null);

  const reload = useCallback(() => {
    getAllSubmissions(submissionRepository).then(setSubs);
  }, []);
  useEffect(() => reload(), [reload]);

  return (
    <div className="page">
      <h1>Calificar entregas</h1>
      <p className="lead">
        Revisa el trabajo de cada estudiante y asigna una calificación.
      </p>
      {subs === null ? (
        <p className="lead">Cargando…</p>
      ) : subs.length === 0 ? (
        <p className="empty">Todavía no hay entregas de estudiantes.</p>
      ) : (
        subs.map((s) => (
          <GradeCard key={s.id} submission={s} onGraded={reload} />
        ))
      )}
    </div>
  );
}
