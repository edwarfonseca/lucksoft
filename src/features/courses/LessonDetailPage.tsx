import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { courseKindSchema, type CourseKind } from "@/domain/models/course";
import { claseEnCurso, estadoCreditos } from "@/domain/models/enrollment";
import {
  NIVEL_LABEL,
  TIPO_SESION_LABEL,
  duracionTotal,
  getSesionContenido,
  type Nivel,
} from "@/domain/models/curriculum";
import {
  LECCIONES_TOTAL,
  estadoLeccion,
  toIndex,
} from "@/domain/models/lessons";
import { getCourse } from "@/courses/registry";
import { getCurriculum } from "@/courses/curriculum";
import { useAuth } from "@/features/auth/auth-context";
import { useEnrollment } from "@/features/courses/enrollment-context";

/**
 * Detalle de una lección (sesión) del currículo: objetivos, conceptos, agenda
 * con tiempos, retos, misión, evaluación, recomendaciones y la recompensa
 * gamificada. Desde aquí se abre el editor del curso. Solo se llega a una
 * lección desbloqueada (el selector y este guard lo controlan).
 */
export function LessonDetailPage() {
  const { kind, periodo, sesion } = useParams();
  const parsedKind = courseKindSchema.safeParse(kind);
  const p = Number(periodo);
  const s = Number(sesion);
  if (!parsedKind.success || !Number.isInteger(p) || !Number.isInteger(s))
    return <Navigate to="/cursos" replace />;
  return <Detail kind={parsedKind.data} periodo={p} sesion={s} />;
}

function Detail({
  kind,
  periodo,
  sesion,
}: {
  kind: CourseKind;
  periodo: number;
  sesion: number;
}) {
  const { user } = useAuth();
  const { enrollment, loading } = useEnrollment();
  const navigate = useNavigate();

  const courseInfo = getCourse(kind);
  const curriculum = getCurriculum(kind);
  const isStudent = user?.role === "estudiante";

  if (!curriculum) return <Navigate to={courseInfo.route} replace />;

  const periodoData = curriculum.find((x) => x.numero === periodo);
  const contenido = getSesionContenido(curriculum, periodo, sesion);
  if (!periodoData || !contenido)
    return <Navigate to={`/curso/${kind}`} replace />;

  const idx = toIndex(periodo, sesion);

  // Control de acceso para estudiantes: solo lecciones vistas o la actual en clase.
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
    const claseAhora =
      inscrito.activo && claseEnCurso(inscrito.diaSemana, inscrito.horaInicio);
    if (estadoLeccion(idx, inscrito.progreso, claseAhora) === "bloqueada")
      return <Navigate to={`/curso/${kind}`} replace />;
  }

  return (
    <div className="page leccion-detalle">
      <div className="leccion-top">
        <Link to={`/curso/${kind}`} className="volver-link">
          ← Lecciones
        </Link>
        <span className="leccion-ruta">
          {courseInfo.icon} {courseInfo.title} · Periodo {periodo} · Lección{" "}
          {idx} de {LECCIONES_TOTAL}
        </span>
      </div>

      <header className="leccion-hero">
        <div
          className="leccion-hero-insignia"
          title={periodoData.insignia.nombre}
        >
          {periodoData.insignia.emoji}
        </div>
        <div>
          <p className="leccion-periodo-nombre">
            Periodo {periodo}: {periodoData.titulo}
          </p>
          <h1>
            Sesión {sesion} · {contenido.titulo}
          </h1>
          <div className="leccion-chips">
            <span className="chip chip-tipo">
              {TIPO_SESION_LABEL[contenido.tipo]}
            </span>
            <span className={`chip chip-nivel nivel-${contenido.nivel}`}>
              {NIVEL_LABEL[contenido.nivel]}
            </span>
            <span className="chip">⏱️ {duracionTotal(contenido)} min</span>
            <span className="chip chip-xp">🎁 {contenido.recompensa}</span>
          </div>
        </div>
      </header>

      <p className="leccion-objetivo">
        <strong>🎯 Objetivo:</strong> {contenido.objetivo}
      </p>

      <button
        className="btn btn-primary abrir-editor-btn"
        onClick={() => navigate(courseInfo.route)}
      >
        ⌨️ Abrir el editor de {courseInfo.title}
      </button>

      <div className="leccion-grid">
        <Card titulo="🧠 Conceptos de la sesión">
          <ul className="lista-check">
            {contenido.conceptos.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Card>

        <Card titulo="🗺️ Agenda de la clase (90 min)">
          <ul className="agenda">
            {contenido.agenda.map((b) => (
              <li key={b.nombre}>
                <span className="agenda-min">{b.minutos}′</span>
                <span>
                  <strong>{b.nombre}.</strong> {b.detalle}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card titulo="✍️ Ejercicios prácticos">
          <ol className="lista-num">
            {contenido.ejercicios.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ol>
        </Card>

        <Card titulo={`🏅 Retos (${contenido.retos.length})`}>
          <ul className="retos">
            {contenido.retos.map((r) => (
              <li key={r.titulo} className="reto">
                <div className="reto-cab">
                  <strong>{r.titulo}</strong>
                  <NivelTag nivel={r.nivel} />
                </div>
                <p>{r.consigna}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          titulo={
            contenido.tipo === "mision"
              ? "🚀 Misión Final"
              : "🎯 Misión de cierre"
          }
          destacada={contenido.tipo === "mision"}
        >
          <p className="cierre-titulo">{contenido.cierre.titulo}</p>
          <p>{contenido.cierre.descripcion}</p>
        </Card>

        <Card titulo="✅ Criterios de evaluación">
          <ul className="lista-check">
            {contenido.evaluacion.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Card>

        <Card titulo="👩‍🏫 Para el docente (10–17 años)">
          <ul className="lista-tip">
            {contenido.recomendaciones.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Card>

        <Card titulo="🎮 Recompensa">
          <p className="recompensa-txt">{contenido.recompensa}</p>
          <p className="recompensa-insignia">
            Al completar el periodo: {periodoData.insignia.emoji} insignia{" "}
            <strong>{periodoData.insignia.nombre}</strong> · {periodoData.xp} XP
            · proyecto <em>{periodoData.proyecto}</em>.
          </p>
        </Card>
      </div>

      <button
        className="btn btn-primary abrir-editor-btn abrir-editor-btn-bottom"
        onClick={() => navigate(courseInfo.route)}
      >
        ⌨️ Abrir el editor de {courseInfo.title}
      </button>
    </div>
  );
}

function Card({
  titulo,
  children,
  destacada,
}: {
  titulo: string;
  children: React.ReactNode;
  destacada?: boolean;
}) {
  return (
    <section className={"leccion-card" + (destacada ? " destacada" : "")}>
      <h3>{titulo}</h3>
      {children}
    </section>
  );
}

function NivelTag({ nivel }: { nivel: Nivel }) {
  return (
    <span className={`chip chip-nivel nivel-${nivel}`}>
      {NIVEL_LABEL[nivel]}
    </span>
  );
}
