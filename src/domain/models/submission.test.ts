import { describe, it, expect } from "vitest";
import { submissionSchema, submitInputSchema } from "./submission";

const base = {
  id: "s_1",
  activityId: "saludo",
  activityTitle: "1. Saludo",
  student: "u1",
  studentName: "Ana",
  submittedAt: 1000,
  grade: null,
  comment: "",
  gradedAt: null,
};

describe("submissionSchema (unión discriminada)", () => {
  it("acepta una entrega python válida", () => {
    const r = submissionSchema.safeParse({
      ...base,
      kind: "python",
      code: "print(1)",
    });
    expect(r.success).toBe(true);
  });

  it("acepta una entrega web con proyecto {html,css,js}", () => {
    const r = submissionSchema.safeParse({
      ...base,
      kind: "web",
      project: { html: "", css: "", js: "" },
    });
    expect(r.success).toBe(true);
  });

  it("rechaza python sin code", () => {
    const r = submissionSchema.safeParse({ ...base, kind: "python" });
    expect(r.success).toBe(false);
  });

  it("rechaza una nota fuera de rango (0–100)", () => {
    const r = submissionSchema.safeParse({
      ...base,
      grade: 150,
      kind: "python",
      code: "x",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza un kind desconocido", () => {
    const r = submissionSchema.safeParse({ ...base, kind: "sql", code: "x" });
    expect(r.success).toBe(false);
  });
});

describe("submitInputSchema", () => {
  it("exige campos identificadores no vacíos", () => {
    const r = submitInputSchema.safeParse({
      kind: "python",
      activityId: "",
      activityTitle: "t",
      student: "u",
      studentName: "n",
      code: "x",
    });
    expect(r.success).toBe(false);
  });
});
