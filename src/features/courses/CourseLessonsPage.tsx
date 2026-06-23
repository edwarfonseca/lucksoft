import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { courseKindSchema, type CourseKind } from "@/domain/models/course";
import { claseEnCurso, estadoCreditos } from "@/domain/models/enrollment";
import {
  LECCIONES_TOTAL,
  PERIODOS,
  SESIONES_POR_PERIODO,
  estadoLeccion,
  fromIndex,
  rango,
  toIndex,
  type Leccion,
} from "@/domain/models/lessons";
import { getCourse } from "@/courses/registry";
import { enrollmentService } from "@/app/services";
import { setProgress } from "@/application/loadEnrollment";
import { useAuth } from "@/features/auth/auth-context";
import { useEnrollment } from "@/features/courses/enrollment-context";

/**
 * Selector de lección: 10 periodos × 4 sesiones. El estudiante solo puede entrar
 * a las lecciones que ya vio y, durante su clase, a la siguiente. Su última
 * lección queda marcada y puede continuarla. Por ahora cada sesión solo abre el
 * editor del curso.
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

  const courseInfo = getCourse(kind);
  const isStudent = user?.role === "estudiante" && !!enrollmentService;

  // Para no-estudiantes (docente/admin/local) todo está libre, sin progreso.
  let frontier = LECCIONES_TOTAL;
  let claseAhora = false;
  let horarioId: string | null = null;

  if (isStudent) {
    if (loading)
      return (
        <div className="page">
          <p className="lead">Cargando…</p>
        </div>
      );
    const inscrito = enrollment?.cursos.find((c) => c.curso === kind);
    const creditos = enrollment?.creditos ?? 0;
    if (!inscrito || estadoCreditos(creditos) === "bloqueado")
      return <Navigate to="/cursos" replace />;
    frontier = inscrito.progreso;
    claseAhora =
      inscrito.activo && claseEnCurso(inscrito.diaSemana, inscrito.horaInicio);
    horarioId = inscrito.horarioId;
  }

  async function entrar(l: Leccion) {
    if (entering) return;
    setEntering(true);
    try {
      if (isStudent && horarioId) {
        await setProgress(
          enrollmentService!,
          horarioId,
          toIndex(l.periodo, l.sesion),
        );
        await reload();
      }
      navigate(courseInfo.route);
    } catch {
      setEntering(false);
    }
  }

  const continuarIdx = claseAhora
    ? Math.min(frontier + 1, LECCIONES_TOTAL)
    : frontier;

  return (
    <div className="page">
      <h1>{courseInfo.title} · Lecciones</h1>
      <p className="lead">
        {isStudent
          ? "Solo se abren las lecciones que ya viste; la siguiente se habilita durante tu clase."
          : "Elige el periodo y la sesión."}
      </p>

      {isStudent && continuarIdx >= 1 && (
        <button
          className="btn btn-primary continuar-btn"
          disabled={entering}
          onClick={() => entrar(fromIndex(continuarIdx))}
        >
          ▶ Continuar — Periodo {fromIndex(continuarIdx).periodo} · Sesión{" "}
          {fromIndex(continuarIdx).sesion}
        </button>
      )}

      <div className="periodos">
        {rango(PERIODOS).map((p) => (
          <div className="periodo-card" key={p}>
            <h3>Periodo {p}</h3>
            <div className="sesiones">
              {rango(SESIONES_POR_PERIODO).map((s) => {
                const idx = toIndex(p, s);
                const estado = estadoLeccion(idx, frontier, claseAhora);
                const bloqueada = estado === "bloqueada";
                const badge =
                  estado === "actual"
                    ? "Clase ahora"
                    : isStudent && idx === frontier
                      ? "Última"
                      : "";
                return (
                  <button
                    key={s}
                    className={
                      "sesion-btn" +
                      (estado === "actual" ? " actual" : "") +
                      (bloqueada ? " bloqueada" : "")
                    }
                    disabled={entering || bloqueada}
                    onClick={() => entrar({ periodo: p, sesion: s })}
                    title={`Periodo ${p} · Sesión ${s}`}
                  >
                    {bloqueada ? "🔒 " : ""}Sesión {s}
                    {badge && <span className="sesion-actual">{badge}</span>}
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
