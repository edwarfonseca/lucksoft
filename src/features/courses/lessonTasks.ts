import { escapeHtml } from "@/lib/html";
import type { Difficulty } from "@/domain/models/course";
import type { Nivel, SesionContenido } from "@/domain/models/curriculum";
import type { PythonAssignment } from "@/courses/python";
import { misionScaffolds, retoScaffolds } from "@/courses/python/scaffolds";

/**
 * Convierte una sesión del currículo en una lista de tareas seleccionables para
 * el panel de Tarea del editor (cada ejercicio, reto y la misión son una tarea
 * aparte). Así el estudiante elige una actividad a la vez en lugar de ver todo
 * de golpe. Cada tarea trae un código base y un tiempo sugerido (clase de 90 min).
 *
 * Las actividades largas (misiones y algunos retos extensos) traen un andamiaje:
 * una estructura de código incompleta y comentada con lo que falta (ver
 * `scaffolds.ts`). Las cortas conservan un comentario simple con el enunciado.
 */

const NIVEL_DIF: Record<Nivel, Difficulty> = {
  principiante: "facil",
  intermedio: "media",
  avanzado: "dificil",
};

const PISTA_ANDAMIAJE =
  '<p class="task-time">🧩 Pulsa «⬇ Cargar código base» para empezar con una ' +
  "estructura ya comenzada y completar lo que falta (# TODO).</p>";

/** Arma el HTML del enunciado (texto de confianza, ya escapado). */
function enunciado(
  texto: string,
  tiempo: number,
  opts?: { intro?: string; conAndamiaje?: boolean },
): string {
  return (
    (opts?.intro ? `<p>${opts.intro}</p>` : "") +
    `<p>${escapeHtml(texto)}</p>` +
    (opts?.conAndamiaje ? PISTA_ANDAMIAJE : "") +
    `<p class="task-time">⏱️ Tiempo sugerido: ~${tiempo} min</p>`
  );
}

export function lessonAssignments(
  periodo: number,
  sesion: number,
  s: SesionContenido,
): PythonAssignment[] {
  const prefix = `p${periodo}s${sesion}`;
  const tasks: PythonAssignment[] = [];

  s.ejercicios.forEach((e, i) => {
    tasks.push({
      id: `${prefix}-ej${i + 1}`,
      titulo: `✍️ Ejercicio ${i + 1}`,
      dificultad: "facil",
      enunciado: enunciado(e, 5),
      codigoBase: `# Ejercicio ${i + 1}\n# ${e}\n\n`,
    });
  });

  s.retos.forEach((r, i) => {
    const id = `${prefix}-reto${i + 1}`;
    const andamiaje = retoScaffolds[id];
    tasks.push({
      id,
      titulo: `🏅 Reto ${i + 1}: ${r.titulo}`,
      dificultad: NIVEL_DIF[r.nivel],
      enunciado: enunciado(r.consigna, 10, { conAndamiaje: !!andamiaje }),
      codigoBase: andamiaje ?? `# Reto: ${r.titulo}\n# ${r.consigna}\n\n`,
    });
  });

  const esMision = s.tipo === "mision";
  const andamiajeMision = misionScaffolds[periodo];
  tasks.push({
    id: `${prefix}-mision`,
    titulo: `${esMision ? "🚀" : "🎯"} ${s.cierre.titulo}`,
    dificultad: NIVEL_DIF[s.nivel],
    enunciado: enunciado(s.cierre.descripcion, esMision ? 35 : 15, {
      intro: `<strong>🎯 ${escapeHtml(s.objetivo)}</strong>`,
      conAndamiaje: esMision && !!andamiajeMision,
    }),
    codigoBase:
      esMision && andamiajeMision
        ? andamiajeMision
        : `# ${s.cierre.titulo}\n\n`,
  });

  return tasks;
}
