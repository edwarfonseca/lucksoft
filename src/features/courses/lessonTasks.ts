import { escapeHtml } from "@/lib/html";
import type { Assignment, Difficulty } from "@/domain/models/course";
import type { Nivel, SesionContenido } from "@/domain/models/curriculum";
import { ejercicioPartes } from "@/domain/models/curriculum";
import type { WebProject } from "@/domain/models/submission";
import type { PythonAssignment } from "@/courses/python";
import type { WebAssignment } from "@/courses/web";
import { misionScaffolds, retoScaffolds } from "@/courses/python/scaffolds";
import {
  misionScaffolds as webMisionScaffolds,
  retoScaffolds as webRetoScaffolds,
} from "@/courses/web/scaffolds";
import { tareasCasa as pythonTareasCasa } from "@/courses/python/tareasCasa";
import { tareasCasa as webTareasCasa } from "@/courses/web/tareasCasa";
import { tareasCasa as scratchTareasCasa } from "@/courses/scratch/tareasCasa";

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
  '<p class="task-hint">🧩 Pulsa «⬇ Cargar código base» para empezar con una ' +
  "estructura ya comenzada y completar lo que falta (# TODO).</p>";

const INTRO_TAREA_CASA =
  "<strong>🏠 Para hacer en casa antes de la próxima clase.</strong>";

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
    const { titulo, descripcion } = ejercicioPartes(e);
    tasks.push({
      id: `${prefix}-ej${i + 1}`,
      titulo: `✍️ Ejercicio ${i + 1}${titulo ? ": " + titulo : ""}`,
      dificultad: "facil",
      enunciado: enunciado(descripcion, 8),
      codigoBase: `# Ejercicio ${i + 1}${titulo ? ": " + titulo : ""}\n# ${descripcion}\n\n`,
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

  const casa = pythonTareasCasa[prefix];
  if (casa) {
    tasks.push({
      id: `${prefix}-casa`,
      titulo: `🏠 Tarea: ${casa.titulo}`,
      dificultad: "facil",
      enunciado: enunciado(casa.descripcion, 25, { intro: INTRO_TAREA_CASA }),
      codigoBase: `# 🏠 Tarea para la casa: ${casa.titulo}\n# ${casa.descripcion}\n\n`,
    });
  }

  return tasks;
}

/**
 * Versión web de `lessonAssignments`: convierte una sesión del currículo en
 * tareas para el editor de Diseño Web. Cada tarea trae un proyecto base
 * `{html, css, js}` que el botón «Cargar código base» vuelca en los tres
 * editores. Las actividades largas (misiones y algunos retos) traen un andamiaje
 * con comentarios TODO (ver `courses/web/scaffolds.ts`); las cortas, un esqueleto
 * mínimo con el enunciado como comentario HTML.
 */
function webBase(titulo: string, descripcion: string): WebProject {
  const linea = titulo ? `${titulo}: ${descripcion}` : descripcion;
  return { html: `<!-- ${linea} -->\n`, css: "", js: "" };
}

export function lessonWebAssignments(
  periodo: number,
  sesion: number,
  s: SesionContenido,
): WebAssignment[] {
  const prefix = `p${periodo}s${sesion}`;
  const tasks: WebAssignment[] = [];

  s.ejercicios.forEach((e, i) => {
    const { titulo, descripcion } = ejercicioPartes(e);
    tasks.push({
      id: `${prefix}-ej${i + 1}`,
      titulo: `✍️ Ejercicio ${i + 1}${titulo ? ": " + titulo : ""}`,
      dificultad: "facil",
      enunciado: enunciado(descripcion, 8),
      base: webBase(
        `Ejercicio ${i + 1}${titulo ? ": " + titulo : ""}`,
        descripcion,
      ),
    });
  });

  s.retos.forEach((r, i) => {
    const id = `${prefix}-reto${i + 1}`;
    const andamiaje = webRetoScaffolds[id];
    tasks.push({
      id,
      titulo: `🏅 Reto ${i + 1}: ${r.titulo}`,
      dificultad: NIVEL_DIF[r.nivel],
      enunciado: enunciado(r.consigna, 10, { conAndamiaje: !!andamiaje }),
      base: andamiaje ?? webBase(`Reto: ${r.titulo}`, r.consigna),
    });
  });

  const esMision = s.tipo === "mision";
  const andamiajeMision = webMisionScaffolds[periodo];
  tasks.push({
    id: `${prefix}-mision`,
    titulo: `${esMision ? "🚀" : "🎯"} ${s.cierre.titulo}`,
    dificultad: NIVEL_DIF[s.nivel],
    enunciado: enunciado(s.cierre.descripcion, esMision ? 35 : 15, {
      intro: `<strong>🎯 ${escapeHtml(s.objetivo)}</strong>`,
      conAndamiaje: esMision && !!andamiajeMision,
    }),
    base:
      esMision && andamiajeMision
        ? andamiajeMision
        : webBase("", s.cierre.titulo),
  });

  const casa = webTareasCasa[prefix];
  if (casa) {
    tasks.push({
      id: `${prefix}-casa`,
      titulo: `🏠 Tarea: ${casa.titulo}`,
      dificultad: "facil",
      enunciado: enunciado(casa.descripcion, 25, { intro: INTRO_TAREA_CASA }),
      base: webBase(`🏠 Tarea para la casa: ${casa.titulo}`, casa.descripcion),
    });
  }

  return tasks;
}

/**
 * Versión sin código de `lessonAssignments`, para cursos por bloques (Scratch),
 * donde no hay "código base" que cargar. Cada ejercicio/reto/misión es una tarea
 * con su tiempo sugerido. Pensado para niños: las etiquetas son más cercanas.
 */
export function lessonActivities(
  periodo: number,
  sesion: number,
  s: SesionContenido,
): Assignment[] {
  const prefix = `p${periodo}s${sesion}`;
  const tasks: Assignment[] = [];

  s.ejercicios.forEach((e, i) => {
    const { titulo, descripcion } = ejercicioPartes(e);
    tasks.push({
      id: `${prefix}-ej${i + 1}`,
      titulo: `✍️ Actividad ${i + 1}${titulo ? ": " + titulo : ""}`,
      dificultad: "facil",
      enunciado: enunciado(descripcion, 10),
    });
  });

  s.retos.forEach((r, i) => {
    tasks.push({
      id: `${prefix}-reto${i + 1}`,
      titulo: `🏅 Reto ${i + 1}: ${r.titulo}`,
      dificultad: NIVEL_DIF[r.nivel],
      enunciado: enunciado(r.consigna, 12),
    });
  });

  const esMision = s.tipo === "mision";
  tasks.push({
    id: `${prefix}-mision`,
    titulo: `${esMision ? "🚀" : "🎯"} ${s.cierre.titulo}`,
    dificultad: NIVEL_DIF[s.nivel],
    enunciado: enunciado(s.cierre.descripcion, esMision ? 40 : 15, {
      intro: `<strong>🎯 ${escapeHtml(s.objetivo)}</strong>`,
    }),
  });

  const casa = scratchTareasCasa[prefix];
  if (casa) {
    tasks.push({
      id: `${prefix}-casa`,
      titulo: `🏠 Tarea: ${casa.titulo}`,
      dificultad: "facil",
      enunciado: enunciado(casa.descripcion, 25, { intro: INTRO_TAREA_CASA }),
    });
  }

  return tasks;
}
