import { describe, it, expect } from "vitest";
import { extremosEntregas, type GrupoEntregas } from "./stats";

function grupo(p: Partial<GrupoEntregas>): GrupoEntregas {
  return {
    horarioId: p.horarioId ?? "h",
    curso: p.curso ?? "python",
    grupo: p.grupo ?? 1,
    docente: p.docente ?? "",
    estudiantes: p.estudiantes ?? 1,
    entregas: p.entregas ?? 0,
    lecciones: p.lecciones ?? 0,
    esperadas: p.esperadas ?? 0,
  };
}

describe("extremosEntregas", () => {
  it("devuelve el grupo con más y con menos entregas", () => {
    const { mas, menos } = extremosEntregas([
      grupo({ horarioId: "a", entregas: 5 }),
      grupo({ horarioId: "b", entregas: 12 }),
      grupo({ horarioId: "c", entregas: 1 }),
    ]);
    expect(mas?.horarioId).toBe("b");
    expect(menos?.horarioId).toBe("c");
  });

  it("ignora los grupos sin estudiantes", () => {
    const { mas, menos } = extremosEntregas([
      grupo({ horarioId: "a", estudiantes: 0, entregas: 0 }),
      grupo({ horarioId: "b", estudiantes: 3, entregas: 4 }),
    ]);
    expect(mas?.horarioId).toBe("b");
    expect(menos?.horarioId).toBe("b");
  });

  it("devuelve null si ningún grupo tiene estudiantes", () => {
    const { mas, menos } = extremosEntregas([
      grupo({ estudiantes: 0 }),
      grupo({ estudiantes: 0 }),
    ]);
    expect(mas).toBeNull();
    expect(menos).toBeNull();
  });
});
