import { describe, it, expect, vi } from "vitest";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import { gradeSubmission, ValidationError } from "./gradeSubmission";

function fakeRepo(): SubmissionRepository {
  return {
    getAll: vi.fn(),
    getByStudent: vi.fn(),
    getById: vi.fn(),
    submit: vi.fn(),
    grade: vi.fn().mockResolvedValue(undefined),
  };
}

describe("gradeSubmission", () => {
  it("guarda una nota válida y recorta el comentario", async () => {
    const repo = fakeRepo();
    await gradeSubmission(repo, "s1", 80, "  ¡bien! ");
    expect(repo.grade).toHaveBeenCalledWith("s1", 80, "¡bien!");
  });

  it.each([-1, 101, 3.5, Number.NaN])(
    "rechaza la nota inválida %s sin tocar el repositorio",
    async (nota) => {
      const repo = fakeRepo();
      await expect(
        gradeSubmission(repo, "s1", nota, ""),
      ).rejects.toBeInstanceOf(ValidationError);
      expect(repo.grade).not.toHaveBeenCalled();
    },
  );
});
