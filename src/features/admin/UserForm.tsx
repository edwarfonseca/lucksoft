import { useState, type FormEvent } from "react";
import type {
  CreatableRole,
  CreateUserInput,
  ManagedProfile,
  UpdateProfileInput,
} from "@/domain/models/profile";
import type { Horario } from "@/domain/models/horario";
import type { AdminService } from "@/domain/ports/AdminService";
import { createUser, updateProfile } from "@/application/manageUsers";
import { horarioLabel } from "@/features/admin/horarioLabel";

interface Props {
  service: AdminService;
  /** Horarios disponibles para asignar al estudiante. */
  horarios: Horario[];
  /** Si viene, es edición; si no, es alta. */
  initial?: ManagedProfile;
  onSaved: () => void;
  onCancel: () => void;
}

interface FormState {
  username: string;
  password: string;
  role: CreatableRole;
  nombres: string;
  apellidos: string;
  edad: string;
  activo: boolean;
  horarioId: string;
  creditosPagados: string;
  nombreAcudiente: string;
  numeroAcudiente: string;
  pais: string;
}

function initialState(p?: ManagedProfile): FormState {
  return {
    username: "",
    password: "",
    role: p && p.role === "docente" ? "docente" : "estudiante",
    nombres: p?.nombres ?? "",
    apellidos: p?.apellidos ?? "",
    edad: p?.edad != null ? String(p.edad) : "",
    activo: p?.activo ?? true,
    horarioId: p?.horarioId ?? "",
    creditosPagados: p ? String(p.creditosPagados) : "0",
    nombreAcudiente: p?.nombreAcudiente ?? "",
    numeroAcudiente: p?.numeroAcudiente ?? "",
    pais: p?.pais ?? "",
  };
}

export function UserForm({
  service,
  horarios,
  initial,
  onSaved,
  onCancel,
}: Props) {
  const isEdit = !!initial;
  const [f, setF] = useState<FormState>(() => initialState(initial));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  const edad = f.edad.trim() === "" ? null : Number(f.edad);
  const creditos =
    f.creditosPagados.trim() === "" ? 0 : Number(f.creditosPagados);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      // El curso se deriva del horario elegido (se mantienen sincronizados).
      const horario = horarios.find((h) => h.id === f.horarioId);
      const studentFields =
        f.role === "estudiante"
          ? {
              horarioId: f.horarioId || null,
              curso: horario?.curso ?? null,
              creditosPagados: creditos,
              nombreAcudiente: f.nombreAcudiente.trim() || null,
              numeroAcudiente: f.numeroAcudiente.trim() || null,
              pais: f.pais.trim() || null,
            }
          : {
              horarioId: null,
              curso: null,
              creditosPagados: 0,
              nombreAcudiente: null,
              numeroAcudiente: null,
              pais: null,
            };

      if (isEdit && initial) {
        const changes: UpdateProfileInput = {
          role: f.role,
          nombres: f.nombres.trim(),
          apellidos: f.apellidos.trim(),
          edad,
          activo: f.activo,
          ...studentFields,
        };
        await updateProfile(service, initial.id, changes);
      } else {
        if (!f.username.trim() || !f.password) {
          setError("Usuario y contraseña son obligatorios.");
          setSaving(false);
          return;
        }
        const input: CreateUserInput = {
          username: f.username.trim(),
          password: f.password,
          role: f.role,
          nombres: f.nombres.trim(),
          apellidos: f.apellidos.trim(),
          edad,
          ...studentFields,
        };
        await createUser(service, input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{isEdit ? "Editar usuario" : "Nuevo usuario"}</h2>

      <div className="form-grid">
        {!isEdit && (
          <>
            <label>
              Usuario (para login)
              <input
                value={f.username}
                onChange={(e) => set("username", e.target.value)}
                placeholder="ej. juan"
              />
            </label>
            <label>
              Contraseña inicial
              <input
                type="text"
                value={f.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="mín. 6 caracteres"
              />
            </label>
          </>
        )}

        <label>
          Rol
          <select
            value={f.role}
            onChange={(e) => set("role", e.target.value as CreatableRole)}
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
        </label>
        {isEdit && (
          <label className="checkbox">
            <input
              type="checkbox"
              checked={f.activo}
              onChange={(e) => set("activo", e.target.checked)}
            />
            Activo
          </label>
        )}

        <label>
          Nombres
          <input
            value={f.nombres}
            onChange={(e) => set("nombres", e.target.value)}
          />
        </label>
        <label>
          Apellidos
          <input
            value={f.apellidos}
            onChange={(e) => set("apellidos", e.target.value)}
          />
        </label>
        <label>
          Edad
          <input
            type="number"
            min={0}
            value={f.edad}
            onChange={(e) => set("edad", e.target.value)}
          />
        </label>

        {f.role === "estudiante" && (
          <>
            <label>
              Horario (curso, día y hora)
              <select
                value={f.horarioId}
                onChange={(e) => set("horarioId", e.target.value)}
              >
                <option value="">— Sin asignar —</option>
                {horarios
                  .filter((h) => h.activo || h.id === f.horarioId)
                  .map((h) => (
                    <option key={h.id} value={h.id}>
                      {horarioLabel(h)}
                      {h.activo ? "" : " (inactivo)"}
                    </option>
                  ))}
              </select>
            </label>
            {horarios.length === 0 && (
              <p className="notice">
                Aún no hay horarios. Créalos en la pestaña “Horarios” para poder
                asignar al estudiante.
              </p>
            )}
            <label>
              Créditos pagados
              <input
                type="number"
                min={0}
                value={f.creditosPagados}
                onChange={(e) => set("creditosPagados", e.target.value)}
              />
            </label>
            <label>
              Nombre del acudiente
              <input
                value={f.nombreAcudiente}
                onChange={(e) => set("nombreAcudiente", e.target.value)}
              />
            </label>
            <label>
              Número del acudiente
              <input
                value={f.numeroAcudiente}
                onChange={(e) => set("numeroAcudiente", e.target.value)}
              />
            </label>
            <label>
              País
              <input
                value={f.pais}
                onChange={(e) => set("pais", e.target.value)}
              />
            </label>
          </>
        )}
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear usuario"}
        </button>
      </div>
    </form>
  );
}
