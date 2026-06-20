import { Link } from "react-router-dom";
import { courseList } from "@/courses/registry";
import { useAuth } from "@/features/auth/auth-context";

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

/** Catálogo de cursos en tarjetas. Los disponibles se leen del registry. */
export function CoursesPage() {
  const { user } = useAuth();
  const lead =
    user?.role === "docente"
      ? "Entra a un curso para probar código, o ve a “Calificar” para revisar entregas."
      : "Elige un curso para empezar a practicar.";

  return (
    <div className="page">
      <h1>Tus cursos</h1>
      <p className="lead">{lead}</p>

      <div className="grid">
        {courseList.map((c) => (
          <Link className="course-card" to={c.route} key={c.kind}>
            <div className="course-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <span className="tag ready">Disponible</span>
          </Link>
        ))}

        {COMING_SOON.map((c) => (
          <div className="course-card locked" key={c.name}>
            <div className="course-icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p>{c.desc}</p>
            <span className="tag soon">Próximamente</span>
          </div>
        ))}
      </div>
    </div>
  );
}
