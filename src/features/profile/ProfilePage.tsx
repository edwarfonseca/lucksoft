import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { profileService } from "@/app/services";
import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
} from "@/application/manageProfile";
import { useAuth } from "@/features/auth/auth-context";

/** Tamaño máximo del avatar (2 MB). */
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

/** "Mi perfil": el usuario edita su nombre para mostrar y su foto de avatar. */
export function ProfilePage() {
  const { user, refresh } = useAuth();

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Sin servicio (modo local) la página muestra un aviso; no se carga nada.
    if (!profileService) return;
    let active = true;
    getMyProfile(profileService)
      .then((p) => {
        if (!active) return;
        setFullName(p.fullName);
        setAvatarUrl(p.avatarUrl);
        setUsername(p.username);
        setCargando(false);
      })
      .catch((e) => {
        if (!active) return;
        setError(
          e instanceof Error ? e.message : "No se pudo cargar el perfil.",
        );
        setCargando(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!profileService) {
    return (
      <div className="page">
        <h1>Mi perfil</h1>
        <p className="notice">
          Editar el perfil requiere Supabase (no está disponible en modo local).
        </p>
      </div>
    );
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setMensaje("");
    setError("");
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen.");
      return;
    }
    if (f.size > MAX_AVATAR_BYTES) {
      setError("La imagen es muy pesada (máximo 2 MB).");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function guardar() {
    if (!profileService || !user) return;
    if (!fullName.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }
    setGuardando(true);
    setError("");
    setMensaje("");
    try {
      let nuevaUrl = avatarUrl;
      if (file) {
        nuevaUrl = await uploadAvatar(profileService, user.id, file);
      }
      await updateMyProfile(profileService, {
        fullName: fullName.trim(),
        avatarUrl: nuevaUrl,
      });
      await refresh(); // refresca el nombre/avatar de la barra superior
      setAvatarUrl(nuevaUrl);
      setFile(null);
      setPreview(null);
      setMensaje("Perfil actualizado ✓");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return (
      <div className="page">
        <h1>Mi perfil</h1>
        <p className="lead">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <h1>Mi perfil</h1>
      <p className="lead">Edita tu nombre y tu foto de avatar.</p>

      <div className="profile-avatar">
        <Avatar
          name={fullName || "?"}
          avatarUrl={preview ?? avatarUrl}
          size={96}
        />
        <div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => fileRef.current?.click()}
          >
            Cambiar foto
          </button>
          {(preview || avatarUrl) && (
            <button
              type="button"
              className="btn btn-ghost danger"
              onClick={() => {
                setFile(null);
                setPreview(null);
                setAvatarUrl(null);
              }}
            >
              Quitar foto
            </button>
          )}
          <p className="muted profile-hint">PNG o JPG, máximo 2 MB.</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onPickFile}
          />
        </div>
      </div>

      <label className="profile-field">
        Nombre para mostrar
        <input
          type="text"
          value={fullName}
          maxLength={60}
          onChange={(e) => setFullName(e.target.value)}
        />
      </label>

      {username && (
        <label className="profile-field">
          Usuario de inicio de sesión
          <input type="text" value={username} disabled />
          <span className="muted profile-hint">
            Tu usuario de acceso lo gestiona la administración.
          </span>
        </label>
      )}

      {error && <p className="error-msg">{error}</p>}
      {mensaje && <p className="ok-msg">{mensaje}</p>}

      <button
        className="btn btn-primary"
        onClick={guardar}
        disabled={guardando}
      >
        {guardando ? "Guardando…" : "Guardar cambios"}
      </button>
    </div>
  );
}
