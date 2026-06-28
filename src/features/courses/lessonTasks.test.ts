import { describe, it, expect } from "vitest";
import { pythonCurriculum } from "@/courses/python/curriculum";
import { webCurriculum } from "@/courses/web/curriculum";
import { scratchCurriculum } from "@/courses/scratch/curriculum";
import { getSesionContenido } from "@/domain/models/curriculum";
import { retoScaffolds } from "@/courses/python/scaffolds";
import { retoScaffolds as webRetoScaffolds } from "@/courses/web/scaffolds";
import {
  lessonActivities,
  lessonAssignments,
  lessonWebAssignments,
} from "./lessonTasks";

describe("tareas de la lección", () => {
  it("genera ejercicios + retos + misión como tareas separadas", () => {
    const s = getSesionContenido(pythonCurriculum, 1, 1)!;
    const tasks = lessonAssignments(1, 1, s);
    expect(tasks).toHaveLength(s.ejercicios.length + s.retos.length + 1);
    expect(tasks.at(-1)!.id).toBe("p1s1-mision");
  });

  it("las actividades muestran su nombre en el título (Python y Scratch)", () => {
    const py = lessonAssignments(
      1,
      1,
      getSesionContenido(pythonCurriculum, 1, 1)!,
    );
    expect(py[0].titulo).toContain("Ejercicio 1");
    expect(py[0].titulo).toContain("Hola, mundo");

    const sc = lessonActivities(
      1,
      1,
      getSesionContenido(scratchCurriculum, 1, 1)!,
    );
    expect(sc[0].titulo).toContain("Actividad 1");
    expect(sc[0].titulo).toContain("Gato andarín");
  });

  it("todos los ejercicios de ambos cursos tienen nombre y descripción", () => {
    for (const c of [pythonCurriculum, scratchCurriculum]) {
      for (const p of c) {
        for (const s of p.sesiones) {
          for (const e of s.ejercicios) {
            expect(typeof e).toBe("object");
            if (typeof e === "object") {
              expect(e.titulo.length).toBeGreaterThan(0);
              expect(e.descripcion.length).toBeGreaterThan(0);
            }
          }
        }
      }
    }
  });

  it("la misión de cada periodo trae un andamiaje con # TODO", () => {
    for (let p = 1; p <= 10; p++) {
      const s = getSesionContenido(pythonCurriculum, p, 4)!;
      const mision = lessonAssignments(p, 4, s).at(-1)!;
      expect(mision.codigoBase).toContain("TODO");
    }
  });

  it("la misión muestra la pista de cargar código base en el enunciado", () => {
    const s = getSesionContenido(pythonCurriculum, 6, 4)!;
    const mision = lessonAssignments(6, 4, s).at(-1)!;
    expect(mision.enunciado).toContain("Cargar código base");
  });

  it("cada clave de retoScaffolds corresponde a un reto existente", () => {
    for (const key of Object.keys(retoScaffolds)) {
      const m = key.match(/^p(\d+)s(\d+)-reto(\d+)$/);
      expect(m).not.toBeNull();
      const p = Number(m![1]);
      const s = Number(m![2]);
      const n = Number(m![3]);
      const ses = getSesionContenido(pythonCurriculum, p, s);
      expect(ses).toBeDefined();
      expect(ses!.retos.length).toBeGreaterThanOrEqual(n);
    }
  });

  it("Web: genera ejercicios + retos + misión con proyecto base {html,css,js}", () => {
    const s = getSesionContenido(webCurriculum, 1, 1)!;
    const tasks = lessonWebAssignments(1, 1, s);
    expect(tasks).toHaveLength(s.ejercicios.length + s.retos.length + 1);
    expect(tasks.at(-1)!.id).toBe("p1s1-mision");
    for (const t of tasks) {
      expect(typeof t.base.html).toBe("string");
      expect(typeof t.base.css).toBe("string");
      expect(typeof t.base.js).toBe("string");
    }
  });

  it("Web: la misión de cada periodo trae un andamiaje con TODO", () => {
    for (let p = 1; p <= 10; p++) {
      const s = getSesionContenido(webCurriculum, p, 4)!;
      const mision = lessonWebAssignments(p, 4, s).at(-1)!;
      const todo = mision.base.html + mision.base.css + mision.base.js;
      expect(todo).toContain("TODO");
    }
  });

  it("Web: cada clave de retoScaffolds corresponde a un reto existente", () => {
    for (const key of Object.keys(webRetoScaffolds)) {
      const m = key.match(/^p(\d+)s(\d+)-reto(\d+)$/);
      expect(m).not.toBeNull();
      const p = Number(m![1]);
      const s = Number(m![2]);
      const n = Number(m![3]);
      const ses = getSesionContenido(webCurriculum, p, s);
      expect(ses).toBeDefined();
      expect(ses!.retos.length).toBeGreaterThanOrEqual(n);
    }
  });
});
