import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";

/** Pantalla de inicio de sesión (migra el antiguo index.html). */
export function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Esperar a que se resuelva la sesión; si ya hay, ir directo a cursos.
  if (loading) return null;
  if (user) return <Navigate to="/cursos" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await login(username.trim(), password);
    if (ok) navigate("/cursos");
    else setError("Usuario o contraseña incorrectos.");
  }

  return (
    <div className="login-wrap">
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

        <p className="hint">
          Cuentas demo (contraseña <b>1234</b>):
          <br />
          Docente: <b>docente</b> · Estudiantes: <b>alumno</b>, <b>alumno2</b>
        </p>
      </form>
    </div>
  );
}
