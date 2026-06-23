import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { courseKindSchema, type CourseKind } from "@/domain/models/course";
import { estadoCreditos } from "@/domain/models/enrollment";
import {
  PERIODOS,
  SESIONES_POR_PERIODO,
  lessonsEqual,
  rango,
  type Leccion,
} from "@/domain/models/lessons";
import { getCourse } from "@/courses/registry";
import { enrollmentService } from "@/app/services";
import { setProgress } from "@/application/loadEnrollment";
import { useAuth } from "@/features/auth/auth-context";
import { useEnrollment } from "@/features/courses/enrollment-context";

/**
 * Selector de lección: 10 periodos × 4 sesiones. Aparece antes del editor para
 * que el estudiante elija periodo/sesión; su última lección queda resaltada como
 * "Actual" y puede continuarla con un clic. Por ahora cualquier sesión solo abre
 * el editor del curso (más adelante tendrá tareas propias).
 */
export function CourseLessonsPage() {
  const { kind } = useParams();
  const parsed = courseKindSchema.safeParse(kind);
  if (!parsed.success) return <Navigate to="/cursos" replace />;
  return <Lessons kind={parsed.data} />;
}

function Lessons({ kind }: { kind: CourseKind }) {
  const { user } = useAuth();
  const { enrollment, loading, reload } = useEnrollment();
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);

  const course = getCourse(kind);
  const isStudent = user?.role === "estudiante" && !!enrollmentService;

  // Acceso del estudiante: solo su curso inscrito y con créditos.
  if (isStudent) {
    if (loading)
      return (
        <div className="page">
          <p className="lead">Cargando…</p>
        </div>
      );
    const clase = enrollment?.clase;
    const creditos = enrollment?.creditos ?? 0;
    if (
      !clase ||
      clase.curso !== kind ||
      estadoCreditos(creditos) === "bloqueado"
    )
      return <Navigate to="/cursos" replace />;
  }

  const progreso: Leccion = enrollment?.progreso ?? { periodo: 1, sesion: 1 };

  async function entrar(l: Leccion) {
    if (entering) return;
    setEntering(true);
    try {
      if (isStudent) {
        await setProgress(enrollmentService!, l.periodo, l.sesion);
        reload();
      }
      navigate(course.route);
    } catch {
      setEntering(false);
    }
  }

  return (
    <div className="page">
      <h1>{course.title} · Lecciones</h1>
      <p className="lead">
        {isStudent
          ? "Continúa donde quedaste o elige el periodo y la sesión a la que quieres entrar."
          : "Elige el periodo y la sesión."}
      </p>

      {isStudent && (
        <button
          className="btn btn-primary continuar-btn"
          disabled={entering}
          onClick={() => entrar(progreso)}
        >
          ▶ Continuar — Periodo {progreso.periodo} · Sesión {progreso.sesion}
        </button>
      )}

      <div className="periodos">
        {rango(PERIODOS).map((p) => (
          <div className="periodo-card" key={p}>
            <h3>Periodo {p}</h3>
            <div className="sesiones">
              {rango(SESIONES_POR_PERIODO).map((s) => {
                const actual =
                  isStudent &&
                  lessonsEqual(progreso, { periodo: p, sesion: s });
                return (
                  <button
                    key={s}
                    className={"sesion-btn" + (actual ? " actual" : "")}
                    disabled={entering}
                    onClick={() => entrar({ periodo: p, sesion: s })}
                    title={`Periodo ${p} · Sesión ${s}`}
                  >
                    Sesión {s}
                    {actual && <span className="sesion-actual">Actual</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
