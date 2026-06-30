import { describe, it, expect } from "vitest";
import type { Submission } from "@/domain/models/submission";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import { getSubmissionsByCourse } from "./listSubmissions";

function sub(id: string, kind: Submission["kind"]): Submission {
  const base = {
    id,
    activityId: "a" + id,
    activityTitle: "Actividad " + id,
    student: "s" + id,
    studentName: "Estudiante " + id,
    submittedAt: 0,
    grade: null,
    comment: "",
    gradedAt: null,
  };
  if (kind === "python") return { ...base, kind, code: "" };
  if (kind === "web")
    return { ...base, kind, project: { html: "", css: "", js: "" } };
  return { ...base, kind, project: "" };
}

/** Repo de prueba: solo necesita getAll para este caso de uso. */
function fakeRepo(subs: Submission[]): SubmissionRepository {
  return {
    getAll: () => Promise.resolve(subs),
    getByStudent: () => Promise.resolve([]),
    getById: () => Promise.resolve(null),
    submit: () => Promise.reject(new Error("no usado")),
    grade: () => Promise.resolve(),
  };
}

describe("getSubmissionsByCourse", () => {
  it("devuelve solo las entregas del curso pedido", async () => {
    const repo = fakeRepo([
      sub("1", "python"),
      sub("2", "web"),
      sub("3", "python"),
      sub("4", "scratch"),
    ]);
    const py = await getSubmissionsByCourse(repo, "python");
    expect(py.map((s) => s.id)).toEqual(["1", "3"]);

    const web = await getSubmissionsByCourse(repo, "web");
    expect(web.map((s) => s.id)).toEqual(["2"]);
  });

  it("devuelve vacío si el curso no tiene entregas", async () => {
    const repo = fakeRepo([sub("1", "python")]);
    expect(await getSubmissionsByCourse(repo, "scratch")).toEqual([]);
  });
});
