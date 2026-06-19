import { Link } from "react-router-dom";

/**
 * Pantalla de login. Esqueleto de la Fase 1: la autenticación real (Supabase)
 * llega en la Fase 5; la UI definitiva, en la Fase 4.
 */
export function LoginPage() {
  return (
    <main className="page">
      <div className="brand">
        <span className="logo">L</span>
        <span>
          Luck<b>Soft</b>
        </span>
      </div>
      <h1>Iniciar sesión</h1>
      <p className="lead">Plataforma de estudio de programación.</p>
      <p className="notice">
        Esqueleto en migración (Fase 1). El login funcional se implementa en
        fases posteriores.
      </p>
      <p>
        <Link className="btn" to="/cursos">
          Entrar a cursos →
        </Link>
      </p>
    </main>
  );
}
