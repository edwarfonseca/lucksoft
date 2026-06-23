import { useCallback, useEffect, useState } from "react";
import type { ManagedProfile } from "@/domain/models/profile";
import type { Horario } from "@/domain/models/horario";
import type { CourseKind } from "@/domain/models/course";
import { adminService } from "@/app/services";
import { deleteUser, listProfiles } from "@/application/manageUsers";
import { listHorarios } from "@/application/manageHorarios";
import { getCourse } from "@/courses/registry";
import { UserForm } from "@/features/admin/UserForm";
import { HorariosPanel } from "@/features/admin/HorariosPanel";
import { horarioLabel } from "@/features/admin/horarioLabel";

const ROLE_LABEL: Record<string, string> = {
  docente: "Docente",
  estudiante: "Estudiante",
  admin: "Admin",
};

type Tab = "usuarios" | "horarios";

/** Panel de administración: gestiona estudiantes, docentes y horarios. */
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
  const [tab, setTab] = useState<Tab>("usuarios");

  return (
    <div className="page">
      <h1>Administración</h1>
      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "usuarios"}
          className={`tab ${tab === "usuarios" ? "active" : ""}`}
          onClick={() => setTab("usuarios")}
        >
          Usuarios
        </button>
        <button
          role="tab"
          aria-selected={tab === "horarios"}
          className={`tab ${tab === "horarios" ? "active" : ""}`}
          onClick={() => setTab("horarios")}
        >
          Horarios
        </button>
      </div>

      {tab === "usuarios" ? (
        <UsuariosPanel service={service} />
      ) : (
        <HorariosPanel service={service} />
      )}
    </div>
  );
}

function UsuariosPanel({
  service,
}: {
  service: NonNullable<typeof adminService>;
}) {
  const [profiles, setProfiles] = useState<ManagedProfile[] | null>(null);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [error, setError] = useState("");
  // null = sin formulario; "new" = alta; un perfil = edición.
  const [editing, setEditing] = useState<ManagedProfile | "new" | null>(null);

  // Los setState van en callbacks de la promesa, no en el cuerpo del efecto
  // (cumple react-hooks/set-state-in-effect).
  const load = useCallback(() => {
    Promise.all([listProfiles(service), listHorarios(service)])
      .then(([data, hs]) => {
        setProfiles(data);
        setHorarios(hs);
        setError("");
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "No se pudo cargar."),
      );
  }, [service]);
  useEffect(() => load(), [load]);

  const horarioById = new Map(horarios.map((h) => [h.id, h]));

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
      <UserForm
        service={service}
        horarios={horarios}
        initial={editing === "new" ? undefined : editing}
        onSaved={() => {
          setEditing(null);
          load();
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <>
      <div className="admin-head">
        <h2>Usuarios</h2>
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
                <th>Usuario</th>
                <th>Rol</th>
                <th>Edad</th>
                <th>Horario</th>
                <th>Créditos</th>
                <th>Acudiente</th>
                <th>País</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => {
                const horario =
                  p.horarioId != null
                    ? horarioById.get(p.horarioId)
                    : undefined;
                return (
                  <tr key={p.id} className={p.activo ? "" : "inactive"}>
                    <td>{p.fullName || "—"}</td>
                    <td>{p.username ?? "—"}</td>
                    <td>{ROLE_LABEL[p.role] ?? p.role}</td>
                    <td>{p.edad ?? "—"}</td>
                    <td>
                      {p.role === "estudiante"
                        ? horario
                          ? horarioLabel(horario)
                          : p.curso
                            ? (getCourse(p.curso as CourseKind)?.title ??
                              p.curso)
                            : "Sin asignar"
                        : "—"}
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
