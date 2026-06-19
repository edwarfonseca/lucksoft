import { Link } from "react-router-dom";

const COURSES = [
  { to: "/python", icon: "🐍", name: "Python" },
  { to: "/scratch", icon: "🐱", name: "Scratch" },
  { to: "/web", icon: "🎨", name: "Diseño Web" },
];

/**
 * Catálogo de cursos. Esqueleto de la Fase 1: las tarjetas y el control por rol
 * se completan en la Fase 4.
 */
export function CoursesPage() {
  return (
    <>
      <h1>Tus cursos</h1>
      <p className="lead">Elige un curso para empezar a practicar.</p>
      <ul>
        {COURSES.map((c) => (
          <li key={c.to}>
            <Link to={c.to}>
              {c.icon} {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="notice">Esqueleto en migración (Fase 1).</p>
    </>
  );
}
