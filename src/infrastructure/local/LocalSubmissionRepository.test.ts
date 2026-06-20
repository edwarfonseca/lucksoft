import { describe, it, expect, beforeEach } from "vitest";
import type { SubmitInput } from "@/domain/models/submission";
import { LocalSubmissionRepository } from "./LocalSubmissionRepository";

// Solo permitimos sobrescribir campos del kind "python" para que el resultado
// siga encajando en la unión discriminada SubmitInput.
type PythonOverrides = Partial<{
  activityId: string;
  activityTitle: string;
  student: string;
  studentName: string;
  code: string;
}>;

const input = (over: PythonOverrides = {}): SubmitInput => ({
  kind: "python",
  activityId: "saludo",
  activityTitle: "1. Saludo",
  student: "u1",
  studentName: "Ana",
  code: "print(1)",
  ...over,
});

describe("LocalSubmissionRepository", () => {
  beforeEach(() => localStorage.clear());

  it("guarda y recupera una entrega", async () => {
    const repo = new LocalSubmissionRepository();
    const saved = await repo.submit(input());
    const all = await repo.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(saved.id);
  });

  it("reenviar conserva el id, no duplica y reinicia la nota", async () => {
    const repo = new LocalSubmissionRepository();
    const first = await repo.submit(input({ code: "v1" }));
    await repo.grade(first.id, 90, "ok");
    const again = await repo.submit(input({ code: "v2" }));

    expect(again.id).toBe(first.id);
    expect(again.grade).toBeNull();
    const all = await repo.getAll();
    expect(all).toHaveLength(1);
    const s = all[0];
    expect(s.kind).toBe("python");
    if (s.kind === "python") expect(s.code).toBe("v2");
  });

  it("grade actualiza la nota", async () => {
    const repo = new LocalSubmissionRepository();
    const saved = await repo.submit(input());
    await repo.grade(saved.id, 75, "bien");
    const got = await repo.getById(saved.id);
    expect(got?.grade).toBe(75);
    expect(got?.comment).toBe("bien");
  });

  it("getByStudent filtra por estudiante", async () => {
    const repo = new LocalSubmissionRepository();
    await repo.submit(input({ student: "u1" }));
    await repo.submit(input({ student: "u2", activityId: "ppt" }));
    expect(await repo.getByStudent("u1")).toHaveLength(1);
    expect(await repo.getByStudent("u2")).toHaveLength(1);
  });

  it("descarta registros corruptos del almacenamiento", async () => {
    localStorage.setItem(
      "lucksoft_submissions",
      JSON.stringify([{ basura: true }, null, "x"]),
    );
    const repo = new LocalSubmissionRepository();
    expect(await repo.getAll()).toHaveLength(0);
  });
});
