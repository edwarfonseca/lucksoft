import {
  claseEnCurso,
  estadoCreditos,
  meetingUrl,
  type ClaseHorario,
} from "@/domain/models/enrollment";
import { grupoNombre } from "@/domain/models/horario";
import { useAuth } from "@/features/auth/auth-context";
import { useEnrollment } from "@/features/courses/enrollment-context";
import { useNowTick } from "@/features/courses/useNowTick";

/** Enlace de "unirse/iniciar" que abre la sala del grupo en otra pestaña. */
function JoinLink({ clase, label }: { clase: ClaseHorario; label: string }) {
  return (
    <a
      className="btn btn-primary btn-clase-header"
      href={meetingUrl(clase)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

/**
 * Botón de la clase remota en el header. Aparece SOLO durante la franja del
 * horario: para el estudiante (su grupo, si tiene créditos) y para el docente
 * (los grupos que dicta). Fuera de la franja no muestra nada.
 */
export function ClassHeaderButton() {
  const { user } = useAuth();
  const { enrollment, teacherClasses } = useEnrollment();
  const now = useNowTick();

  const enVivo = (c: ClaseHorario) =>
    c.activo && claseEnCurso(c.diaSemana, c.horaInicio, now);

  if (user?.role === "estudiante") {
    const creditos = enrollment?.creditos ?? 0;
    if (estadoCreditos(creditos) === "bloqueado") return null;
    const live = (enrollment?.cursos ?? []).filter(enVivo);
    if (live.length === 0) return null;
    return (
      <>
        {live.map((c) => (
          <JoinLink
            key={c.horarioId}
            clase={c}
            label={`📹 Unirse a la clase (${grupoNombre(c)})`}
          />
        ))}
      </>
    );
  }

  if (user?.role === "docente") {
    const live = teacherClasses.filter(enVivo);
    if (live.length === 0) return null;
    return (
      <>
        {live.map((c) => (
          <JoinLink
            key={c.horarioId}
            clase={c}
            label={`📹 Iniciar clase ${grupoNombre(c)}`}
          />
        ))}
      </>
    );
  }

  return null;
}
