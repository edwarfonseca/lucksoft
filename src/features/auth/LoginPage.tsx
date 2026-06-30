import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";

/**
 * Personajes animados del fondo del login. Cada uno es un mini-bundle HTML
 * autocontenido servido desde `public/characters/`. Para añadir más, deja el
 * archivo en esa carpeta y agrega una entrada aquí con su posición (clase CSS
 * `.personaje p-N` definida en global.css).
 */
const PERSONAJES_FONDO = [
  { src: "/characters/saludo.html", pos: "p-1", title: "Personaje saludando" },
];

/** Pantalla de inicio de sesión (migra el antiguo index.html). */
export function LoginPage() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Esperar a que se resuelva la sesión; si ya hay, ir a su área según el rol.
  if (loading) return null;
  if (user) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/cursos"} replace />
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await login(username.trim(), password);
    if (!ok) setError("Usuario o contraseña incorrectos.");
    // Si fue correcto, el redirect de arriba actúa al actualizarse la sesión.
  }

  return (
    <div className="login-wrap">
      <div className="login-bg" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <div className="login-grid" />
        {PERSONAJES_FONDO.map((p) => (
          <iframe
            key={p.src}
            src={p.src}
            title={p.title}
            className={`personaje ${p.pos}`}
            loading="lazy"
            tabIndex={-1}
          />
        ))}
      </div>
      <form className="login-card" onSubmit={onSubmit}>
        <div className="brand">
          <span className="logo">L</span>
          <span>
            Luck<b>Soft</b>
          </span>
        </div>
        <p className="subtitle">Plataforma de estudio de programación</p>

        <div className="field">
          <label htmlFor="user">Usuario</label>
          <input
            id="user"
            type="text"
            placeholder="alumno"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </div>
  );
}
