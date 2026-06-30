import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/Avatar";

const ROLE_LABEL: Record<string, string> = {
  docente: "Docente",
  admin: "Admin",
  estudiante: "Estudiante",
};

/**
 * Menú de usuario de la barra superior: avatar (foto o iniciales) + nombre y un
 * desplegable con su rol, "Mi perfil" y cerrar sesión. Sirve para todos los roles.
 */
export function UserMenu({
  name,
  role,
  avatarUrl,
  onLogout,
}: {
  name: string;
  role: string;
  avatarUrl?: string | null;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera o pulsar Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="user-menu" ref={ref}>
      <button
        className="user-menu-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar name={name} avatarUrl={avatarUrl} />
        <span className="user-menu-name">{name}</span>
        <span className="user-menu-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="user-menu-dropdown" role="menu">
          <div className="user-menu-info">
            <Avatar name={name} avatarUrl={avatarUrl} size={40} />
            <span className="meta">
              <span className="nm">{name}</span>
              <span className={"rol-badge rol-" + role}>
                {ROLE_LABEL[role] ?? role}
              </span>
            </span>
          </div>
          <div className="user-menu-sep" />
          <Link
            className="user-menu-item"
            role="menuitem"
            to="/perfil"
            onClick={() => setOpen(false)}
          >
            Mi perfil
          </Link>
          <button
            className="user-menu-item danger"
            role="menuitem"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
