import { Link } from "react-router-dom";
import { courseList } from "@/courses/registry";

/**
 * Catálogo de cursos. Los cursos se leen del registry (patrón Registry): añadir
 * uno nuevo aparece aquí sin tocar esta página. El control por rol y el diseño
 * de las tarjetas se completan en la Fase 4.
 */
export function CoursesPage() {
  return (
    <>
      <h1>Tus cursos</h1>
      <p className="lead">Elige un curso para empezar a practicar.</p>
      <ul>
        {courseList.map((c) => (
          <li key={c.kind}>
            <Link to={c.route}>
              {c.icon} {c.title}
            </Link>{" "}
            — {c.description}
          </li>
        ))}
      </ul>
      <p className="notice">Esqueleto en migración (Fase 1).</p>
    </>
  );
}
