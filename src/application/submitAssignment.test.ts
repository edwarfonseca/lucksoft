import { describe, it, expect, vi } from "vitest";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import type { Submission, SubmitInput } from "@/domain/models/submission";
import { submitAssignment } from "./submitAssignment";

const validInput: SubmitInput = {
  kind: "python",
  activityId: "saludo",
  activityTitle: "1. Saludo",
  student: "u1",
  studentName: "Ana",
  code: "print(1)",
};

function fakeRepo(stored: Submission): SubmissionRepository {
  return {
    getAll: vi.fn(),
    getByStudent: vi.fn(),
    getById: vi.fn(),
    submit: vi.fn().mockResolvedValue(stored),
    grade: vi.fn(),
  };
}

describe("submitAssignment", () => {
  it("valida la entrada y delega en repo.submit", async () => {
    const stored = {
      ...validInput,
      id: "s1",
      submittedAt: 1,
      grade: null,
      comment: "",
      gradedAt: null,
    } as Submission;
    const repo = fakeRepo(stored);
    const result = await submitAssignment(repo, validInput);
    expect(repo.submit).toHaveBeenCalledWith(validInput);
    expect(result).toBe(stored);
  });

  it("rechaza entrada inválida sin llamar al repositorio", async () => {
    const stored = {
      ...validInput,
      id: "s1",
      submittedAt: 1,
      grade: null,
      comment: "",
      gradedAt: null,
    } as Submission;
    const repo = fakeRepo(stored);
    await expect(
      submitAssignment(repo, { ...validInput, activityId: "" }),
    ).rejects.toThrow();
    expect(repo.submit).not.toHaveBeenCalled();
  });
});
