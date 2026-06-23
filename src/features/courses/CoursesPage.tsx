import { Link } from "react-router-dom";
import { courseList, getCourse } from "@/courses/registry";
import { estadoCreditos, type ClaseHorario } from "@/domain/models/enrollment";
import {
  DIA_SEMANA_LABEL,
  formatHora,
  grupoNombre,
} from "@/domain/models/horario";
import { enrollmentService } from "@/app/services";
import { useAuth } from "@/features/auth/auth-context";
import { useEnrollment } from "@/features/courses/enrollment-context";

// Cursos aún no disponibles (teasers). No son estrategias reales todavía.
const COMING_SOON = [
  {
    icon: "💻",
    name: "C / C++",
    desc: "Fundamentos de programación de bajo nivel y memoria.",
  },
  {
    icon: "🗄️",
    name: "SQL",
    desc: "Consultas, bases de datos relacionales y modelado.",
  },
];

/** Catálogo de cursos. El estudiante ve solo su curso inscrito; el resto, todos. */
export function CoursesPage() {
  const { user } = useAuth();
  if (user?.role === "estudiante") return <StudentCourses />;
  if (user?.role === "docente") return <TeacherCourses />;
  return <FullCatalog lead="Elige un curso para empezar a practicar." />;
}

/** Texto "Martes a las 17:00" de una clase. */
function franja(c: ClaseHorario): string {
  return `${DIA_SEMANA_LABEL[c.diaSemana]} a las ${formatHora(c.horaInicio)}`;
}

/** Vista del estudiante: sus cursos inscritos, créditos y horarios. */
function StudentCourses() {
  const { enrollment, loading } = useEnrollment();

  // Modo local/demo: sin servicio de inscripción, muestra el catálogo normal.
  if (!enrollmentService)
    return <FullCatalog lead="Elige un curso para empezar a practicar." />;

  if (loading)
    return (
      <div className="page">
        <h1>Tus cursos</h1>
        <p className="lead">Cargando tus cursos…</p>
      </div>
    );

  if (!enrollment)
    return (
      <div className="page">
        <h1>Tus cursos</h1>
        <p className="error-msg">No se pudo cargar tu inscripción.</p>
      </div>
    );

  const { cursos, creditos } = enrollment;

  if (cursos.length === 0)
    return (
      <div className="page">
        <h1>Tus cursos</h1>
        <p className="empty">
          Aún no estás inscrito en ningún curso. Contacta con administración
          para que te asignen un grupo.
        </p>
      </div>
    );

  const estado = estadoCreditos(creditos);
  const bloqueado = estado === "bloqueado";

  return (
    <div className="page">
      <h1>Tus cursos</h1>

      {estado === "bloqueado" && (
        <p className="banner banner-bloqueo">
          ⛔ Tus créditos se agotaron. Tus cursos están bloqueados. Renueva tus
          créditos para volver a entrar.
        </p>
      )}
      {estado === "advertencia" && (
        <p className="banner banner-aviso">
          ⚠️ Te{" "}
          {creditos === 1 ? "queda 1 crédito" : `quedan ${creditos} créditos`}.
          Se van a acabar pronto: renueva a tiempo para no perder tus clases.
        </p>
      )}
      {estado === "ok" && (
        <p className="lead">
          Créditos disponibles: <strong>{creditos}</strong>
        </p>
      )}

      <div className="grid">
        {cursos.map((c) => {
          const course = getCourse(c.curso);
          return bloqueado ? (
            <div className="course-card locked" key={c.horarioId}>
              <div className="course-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p className="muted">
                {grupoNombre(c)} · {franja(c)}
              </p>
              <span className="tag soon">Bloqueado</span>
            </div>
          ) : (
            <Link
              className="course-card"
              to={`/curso/${c.curso}`}
              key={c.horarioId}
            >
              <div className="course-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p className="muted">
                {grupoNombre(c)} · {franja(c)}
              </p>
              <span className="tag ready">Disponible</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Vista del docente: todos los cursos + el horario de sus grupos. */
function TeacherCourses() {
  const { teacherClasses } = useEnrollment();

  return (
    <div className="page">
      <h1>Tus cursos</h1>
      <p className="lead">
        Entra a un curso para probar código, o ve a “Calificar” para revisar
        entregas.
      </p>

      {teacherClasses.length > 0 && (
        <section className="clases-docente">
          <h2>Tus clases</h2>
          {teacherClasses.map((c) => (
            <div className="clase-remota-card" key={c.horarioId}>
              <div>
                <h3>
                  {grupoNombre(c)} · {getCourse(c.curso).title}
                </h3>
                <p className="muted">{franja(c)} (1 hora)</p>
              </div>
              <p className="clase-remota-hint">
                Durante la clase, el botón “Iniciar clase” aparece arriba.
              </p>
            </div>
          ))}
        </section>
      )}

      <CatalogGrid showComingSoon />
    </div>
  );
}

/** Catálogo completo (admin y modo local). */
function FullCatalog({ lead }: { lead: string }) {
  return (
    <div className="page">
      <h1>Tus cursos</h1>
      <p className="lead">{lead}</p>
      <CatalogGrid showComingSoon />
    </div>
  );
}

/** Rejilla de tarjetas de todos los cursos disponibles (+ teasers opcionales). */
function CatalogGrid({ showComingSoon }: { showComingSoon?: boolean }) {
  return (
    <div className="grid">
      {courseList.map((c) => (
        <Link className="course-card" to={c.route} key={c.kind}>
          <div className="course-icon">{c.icon}</div>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <span className="tag ready">Disponible</span>
        </Link>
      ))}

      {showComingSoon &&
        COMING_SOON.map((c) => (
          <div className="course-card locked" key={c.name}>
            <div className="course-icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p>{c.desc}</p>
            <span className="tag soon">Próximamente</span>
          </div>
        ))}
    </div>
  );
}
