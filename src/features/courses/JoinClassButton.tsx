import { useAuth } from "@/features/auth/auth-context";

/**
 * Botón "Unirse a la clase" (migra clase.js). Abre una sala fija de Jitsi por
 * curso en una pestaña nueva, con el nombre del usuario.
 */
export function JoinClassButton({ course }: { course: string }) {
  const { user } = useAuth();

  function join() {
    const displayName = user?.name ?? "Invitado";
    const room = "LuckSoftAula" + course;
    const url =
      "https://meet.jit.si/" +
      encodeURIComponent(room) +
      "#userInfo.displayName=" +
      encodeURIComponent('"' + displayName + '"');
    window.open(url, "_blank", "noopener");
  }

  return (
    <button className="btn btn-ghost" onClick={join}>
      📹 Unirse a la clase
    </button>
  );
}
