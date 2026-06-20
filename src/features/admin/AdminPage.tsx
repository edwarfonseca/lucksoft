import { useCallback, useEffect, useState } from "react";
import type { ManagedProfile } from "@/domain/models/profile";
import { adminService } from "@/app/services";
import { deleteUser, listProfiles } from "@/application/manageUsers";
import { UserForm } from "@/features/admin/UserForm";

const ROLE_LABEL: Record<string, string> = {
  docente: "Docente",
  estudiante: "Estudiante",
  admin: "Admin",
};

/** Panel de administración: gestiona estudiantes y docentes. */
export function AdminPage() {
  if (!adminService) {
    return (
      <div className="page">
        <h1>Administración</h1>
        <p className="notice">
          El panel de administración requiere Supabase (no está disponible en
          modo local).
        </p>
      </div>
    );
  }
  return <AdminPanel />;
}

function AdminPanel() {
  const service = adminService!;
  const [profiles, setProfiles] = useState<ManagedProfile[] | null>(null);
  const [error, setError] = useState("");
  // null = sin formulario; "new" = alta; un perfil = edición.
  const [editing, setEditing] = useState<ManagedProfile | "new" | null>(null);

  // Los setState van en callbacks de la promesa, no en el cuerpo del efecto
  // (cumple react-hooks/set-state-in-effect).
  const load = useCallback(() => {
    listProfiles(service)
      .then((data) => {
        setProfiles(data);
        setError("");
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "No se pudo cargar."),
      );
  }, [service]);
  useEffect(() => load(), [load]);

  async function onDelete(p: ManagedProfile) {
    if (
      !confirm(
        `¿Eliminar a ${p.fullName || "este usuario"}? No se puede deshacer.`,
      )
    )
      return;
    try {
      await deleteUser(service, p.id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar.");
    }
  }

  if (editing) {
    return (
      <div className="page">
        <UserForm
          service={service}
          initial={editing === "new" ? undefined : editing}
          onSaved={() => {
            setEditing(null);
            load();
          }}
          onCancel={() => setEditing(null)}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="admin-head">
        <h1>Administración de usuarios</h1>
        <button className="btn btn-primary" onClick={() => setEditing("new")}>
          + Nuevo usuario
        </button>
      </div>
      {error && <p className="error-msg">{error}</p>}

      {profiles === null ? (
        <p className="lead">Cargando…</p>
      ) : profiles.length === 0 ? (
        <p className="empty">No hay usuarios todavía.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Edad</th>
                <th>Curso</th>
                <th>Créditos</th>
                <th>Acudiente</th>
                <th>País</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className={p.activo ? "" : "inactive"}>
                  <td>{p.fullName || "—"}</td>
                  <td>{ROLE_LABEL[p.role] ?? p.role}</td>
                  <td>{p.edad ?? "—"}</td>
                  <td>{p.role === "estudiante" ? (p.curso ?? "—") : "—"}</td>
                  <td>{p.role === "estudiante" ? p.creditosPagados : "—"}</td>
                  <td>
                    {p.role === "estudiante" && p.nombreAcudiente
                      ? `${p.nombreAcudiente}${p.numeroAcudiente ? " · " + p.numeroAcudiente : ""}`
                      : "—"}
                  </td>
                  <td>{p.role === "estudiante" ? (p.pais ?? "—") : "—"}</td>
                  <td>{p.activo ? "Activo" : "Inactivo"}</td>
                  <td className="admin-actions">
                    {p.role !== "admin" && (
                      <>
                        <button
                          className="btn btn-ghost"
                          onClick={() => setEditing(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-ghost danger"
                          onClick={() => onDelete(p)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
