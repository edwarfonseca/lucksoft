import {
  submissionSchema,
  type Submission,
  type SubmitInput,
} from "@/domain/models/submission";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";

const STORAGE_KEY = "lucksoft_submissions";

/**
 * Adaptador de persistencia sobre localStorage (equivale al antiguo
 * LuckSoft/js/db.js). Útil sin backend y para tests. En la Fase 5 convivirá con
 * SupabaseSubmissionRepository tras el mismo port.
 */
export class LocalSubmissionRepository implements SubmissionRepository {
  private read(): Submission[] {
    try {
      const raw: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      );
      if (!Array.isArray(raw)) return [];
      // Validamos cada registro; descartamos los corruptos en vez de romper.
      return raw.flatMap((item) => {
        const parsed = submissionSchema.safeParse(item);
        return parsed.success ? [parsed.data] : [];
      });
    } catch {
      return [];
    }
  }

  private write(list: Submission[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  private newId(): string {
    return "s_" + Date.now() + "_" + Math.random().toString(16).slice(2, 8);
  }

  /** Construye una entrega nueva (pendiente) a partir de la entrada y un id. */
  private build(id: string, input: SubmitInput): Submission {
    const common = {
      id,
      activityId: input.activityId,
      activityTitle: input.activityTitle,
      student: input.student,
      studentName: input.studentName,
      submittedAt: Date.now(),
      grade: null,
      comment: "",
      gradedAt: null,
    };
    switch (input.kind) {
      case "python":
        return { ...common, kind: "python", code: input.code };
      case "web":
        return { ...common, kind: "web", project: input.project };
      case "scratch":
        return { ...common, kind: "scratch", project: input.project };
    }
  }

  async getAll(): Promise<Submission[]> {
    return this.read().sort((a, b) => b.submittedAt - a.submittedAt);
  }

  async getByStudent(studentId: string): Promise<Submission[]> {
    return (await this.getAll()).filter((s) => s.student === studentId);
  }

  async getById(id: string): Promise<Submission | null> {
    return this.read().find((s) => s.id === id) ?? null;
  }

  async submit(input: SubmitInput): Promise<Submission> {
    const list = this.read();
    const existing = list.find(
      (s) => s.activityId === input.activityId && s.student === input.student,
    );
    // Reenviar conserva el id pero reinicia la calificación a pendiente.
    const submission = this.build(existing?.id ?? this.newId(), input);
    const next = existing
      ? list.map((s) => (s.id === existing.id ? submission : s))
      : [...list, submission];
    this.write(next);
    return submission;
  }

  async grade(
    submissionId: string,
    grade: number,
    comment: string,
  ): Promise<void> {
    const list = this.read();
    const next = list.map((s) =>
      s.id === submissionId
        ? { ...s, grade, comment, gradedAt: Date.now() }
        : s,
    );
    this.write(next);
  }
}
