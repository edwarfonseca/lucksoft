import { describe, it, expect } from "vitest";
import { pythonCurriculum } from "@/courses/python/curriculum";
import { getSesionContenido } from "@/domain/models/curriculum";
import { retoScaffolds } from "@/courses/python/scaffolds";
import { lessonAssignments } from "./lessonTasks";

describe("tareas de la lección", () => {
  it("genera ejercicios + retos + misión como tareas separadas", () => {
    const s = getSesionContenido(pythonCurriculum, 1, 1)!;
    const tasks = lessonAssignments(1, 1, s);
    expect(tasks).toHaveLength(s.ejercicios.length + s.retos.length + 1);
    expect(tasks.at(-1)!.id).toBe("p1s1-mision");
  });

  it("la misión de cada periodo trae un andamiaje con # TODO", () => {
    for (let p = 1; p <= 10; p++) {
      const s = getSesionContenido(pythonCurriculum, p, 4)!;
      const mision = lessonAssignments(p, 4, s).at(-1)!;
      expect(mision.codigoBase).toContain("TODO");
    }
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
});
