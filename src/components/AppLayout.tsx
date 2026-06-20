import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";

/** Enlaces de navegación según el rol del usuario. */
function navLinksFor(role: string) {
  if (role === "admin") return [{ to: "/admin", label: "Administración" }];
  const links = [{ to: "/cursos", label: "Cursos" }];
  if (role === "estudiante") links.push({ to: "/notas", label: "Mis notas" });
  if (role === "docente") links.push({ to: "/calificar", label: "Calificar" });
  return links;
}

/**
 * Layout con barra superior dependiente del rol (migra el antiguo ui.js).
 */
export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null; // RequireAuth ya protege; esto es defensa de tipos.

  async function onLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">L</span>
          <span>
            Luck<b>Soft</b>
          </span>
        </div>
        <nav className="nav">
          {navLinksFor(user.role).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="user-box">
          <span className={"rol-badge rol-" + user.role}>
            {user.role === "docente" ? "Docente" : "Estudiante"}
          </span>
          <span>{user.name}</span>
          <button className="btn btn-ghost" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
