import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CourseKind } from "@/domain/models/course";
import type { Submission } from "@/domain/models/submission";
import { courseList, getCourse } from "@/courses/registry";
import { enrollmentService, submissionRepository } from "@/app/services";
import { getAllSubmissions } from "@/application/listSubmissions";
import { useEnrollment } from "@/features/courses/enrollment-context";

/**
 * "Calificar" (vista del docente): muestra los cursos que tiene asignados. Al
 * entrar en uno se ven las entregas de ese curso para calificarlas. En modo
 * local (sin Supabase) el docente puede calificar todos los cursos.
 */
export function GradingPage() {
  const { teacherClasses, teacherStudents, teacherLoading } = useEnrollment();
  const [subs, setSubs] = useState<Submission[] | null>(null);

  useEffect(() => {
    let active = true;
    getAllSubmissions(submissionRepository)
      .then((s) => active && setSubs(s))
      .catch(() => active && setSubs([]));
    return () => {
      active = false;
    };
  }, []);

  // Cursos asignados: los distintos cursos de sus grupos, en el orden del
  // catálogo. Sin servicio de inscripción (modo local) puede calificar todos.
  const asignados = new Set(teacherClasses.map((c) => c.curso));
  const cursos: CourseKind[] = enrollmentService
    ? courseList.map((c) => c.kind).filter((k) => asignados.has(k))
    : courseList.map((c) => c.kind);

  function conteo(kind: CourseKind) {
    let list = (subs ?? []).filter((s) => s.kind === kind);
    // Con Supabase, contar solo las entregas de los estudiantes de sus grupos.
    if (enrollmentService) {
      const ids = new Set(
        teacherStudents.filter((t) => t.curso === kind).map((t) => t.studentId),
      );
      list = list.filter((s) => ids.has(s.student));
    }
    return {
      total: list.length,
      pendientes: list.filter((s) => s.grade === null).length,
    };
  }

  if (enrollmentService && teacherLoading) {
    return (
      <div className="page">
        <h1>Calificar</h1>
        <p className="lead">Cargando tus cursos…</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Calificar</h1>
      <p className="lead">
        Elige uno de tus cursos para revisar y calificar las entregas de los
        estudiantes.
      </p>

      {cursos.length === 0 ? (
        <p className="empty">
          No tienes cursos asignados. Pide a administración que te asigne un
          grupo en “Horarios”.
        </p>
      ) : (
        <div className="grid">
          {cursos.map((kind) => {
            const course = getCourse(kind);
            const { total, pendientes } = conteo(kind);
            return (
              <Link
                className="course-card"
                to={`/calificar/${kind}`}
                key={kind}
              >
                <div className="course-icon">{course.icon}</div>
                <h3>{course.title}</h3>
                <p className="muted">
                  {subs === null
                    ? "Cargando entregas…"
                    : total === 0
                      ? "Sin entregas todavía"
                      : `${total} ${total === 1 ? "entrega" : "entregas"}`}
                </p>
                {pendientes > 0 ? (
                  <span className="tag soon">
                    {pendientes} {pendientes === 1 ? "pendiente" : "pendientes"}
                  </span>
                ) : (
                  <span className="tag ready">Al día</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
