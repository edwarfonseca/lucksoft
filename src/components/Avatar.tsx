/** Iniciales del nombre para el avatar (1–2 letras). */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/** Color estable derivado del nombre, para que cada usuario tenga el suyo. */
function avatarHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

/**
 * Avatar del usuario: su foto si tiene avatarUrl; si no, un círculo con sus
 * iniciales y un color propio. Se usa en el menú superior y en "Mi perfil".
 */
export function Avatar({
  name,
  avatarUrl,
  size = 32,
}: {
  name: string;
  avatarUrl?: string | null;
  size?: number;
}) {
  if (avatarUrl) {
    return (
      <img
        className="avatar avatar-img"
        src={avatarUrl}
        alt={`Avatar de ${name}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.4),
        background: `hsl(${avatarHue(name)}, 55%, 45%)`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
