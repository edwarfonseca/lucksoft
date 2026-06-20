import { describe, it, expect } from "vitest";
import { courseList, getCourse } from "./registry";

describe("registry de cursos", () => {
  it("expone 3 cursos", () => {
    expect(courseList).toHaveLength(3);
  });

  it("getCourse resuelve la estrategia por kind", () => {
    expect(getCourse("python").kind).toBe("python");
    expect(getCourse("web").kind).toBe("web");
    expect(getCourse("scratch").kind).toBe("scratch");
  });

  it("python.buildSubmitInput arma un SubmitInput correcto", () => {
    const c = getCourse("python");
    const result = c.buildSubmitInput({
      assignment: c.assignments[0],
      student: { id: "u1", name: "Ana" },
      content: { code: "x" },
    });
    expect(result).toMatchObject({
      kind: "python",
      student: "u1",
      studentName: "Ana",
      code: "x",
    });
  });

  it("web prefija el título con 'Web · '", () => {
    const c = getCourse("web");
    const result = c.buildSubmitInput({
      assignment: c.assignments[0],
      student: { id: "u", name: "n" },
      content: c.assignments[0].base,
    });
    expect(result.activityTitle.startsWith("Web · ")).toBe(true);
  });
});
