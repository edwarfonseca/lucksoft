import { Link, Outlet } from "react-router-dom";

/**
 * Layout compartido con la barra superior. En la Fase 4 la navegación pasará a
 * depender del rol del usuario (ver LuckSoft/PLAN.md); por ahora es estática.
 */
export function AppLayout() {
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
          <Link to="/cursos">Cursos</Link>
          <Link to="/notas">Mis notas</Link>
          <Link to="/calificar">Calificar</Link>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
