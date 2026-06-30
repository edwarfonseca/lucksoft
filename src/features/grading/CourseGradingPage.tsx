import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { courseKindSchema, type CourseKind } from "@/domain/models/course";
import type { Submission } from "@/domain/models/submission";
import { getCourse } from "@/courses/registry";
import { enrollmentService, submissionRepository } from "@/app/services";
import { getSubmissionsByCourse } from "@/application/listSubmissions";
import { useEnrollment } from "@/features/courses/enrollment-context";
import { GradeCard } from "@/features/grading/GradeCard";

/** Entregas de un curso concreto para calificar (vista del docente). */
export function CourseGradingPage() {
  const { kind } = useParams();
  const parsed = courseKindSchema.safeParse(kind);
  if (!parsed.success) return <Navigate to="/calificar" replace />;
  return <CourseGrading kind={parsed.data} />;
}

function CourseGrading({ kind }: { kind: CourseKind }) {
  const { teacherClasses, teacherStudents, teacherLoading } = useEnrollment();
  const [subs, setSubs] = useState<Submission[] | null>(null);

  const reload = useCallback(() => {
    getSubmissionsByCourse(submissionRepository, kind)
      .then(setSubs)
      .catch(() => setSubs([]));
  }, [kind]);
  useEffect(() => reload(), [reload]);

  const course = getCourse(kind);

  // Mientras cargan los grupos del docente no decidimos el acceso (evita un
  // redirect prematuro). En modo local todos los cursos están permitidos.
  if (enrollmentService && teacherLoading) {
    return (
      <div className="page">
        <h1>
          {course.icon} {course.title}
        </h1>
        <p className="lead">Cargando…</p>
      </div>
    );
  }

  const permitido =
    !enrollmentService || teacherClasses.some((c) => c.curso === kind);
  if (!permitido) return <Navigate to="/calificar" replace />;

  // Con Supabase, solo las entregas de los estudiantes de los grupos del docente
  // (no las de los grupos de otros profes). En modo local se muestran todas.
  const idsDeMisGrupos = enrollmentService
    ? new Set(
        teacherStudents.filter((t) => t.curso === kind).map((t) => t.studentId),
      )
    : null;
  const visibles =
    subs === null
      ? null
      : idsDeMisGrupos
        ? subs.filter((s) => idsDeMisGrupos.has(s.student))
        : subs;

  // Pendientes primero; dentro de cada grupo, de la más reciente a la más antigua.
  const ordenadas = visibles
    ? [...visibles].sort((a, b) => {
        const ap = a.grade === null ? 0 : 1;
        const bp = b.grade === null ? 0 : 1;
        return ap !== bp ? ap - bp : b.submittedAt - a.submittedAt;
      })
    : null;
  const pendientes = ordenadas?.filter((s) => s.grade === null).length ?? 0;

  return (
    <div className="page">
      <p>
        <Link className="back-link" to="/calificar">
          ← Mis cursos
        </Link>
      </p>
      <h1>
        {course.icon} {course.title} · Calificar
      </h1>
      <p className="lead">
        Entregas de los estudiantes en este curso.
        {ordenadas && ordenadas.length > 0
          ? ` ${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"} de ${ordenadas.length}.`
          : ""}
      </p>

      {ordenadas === null ? (
        <p className="lead">Cargando entregas…</p>
      ) : ordenadas.length === 0 ? (
        <p className="empty">
          Todavía no hay entregas de estudiantes en este curso.
        </p>
      ) : (
        ordenadas.map((s) => (
          <GradeCard key={s.id} submission={s} onGraded={reload} />
        ))
      )}
    </div>
  );
}
