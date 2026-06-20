import {
  submissionSchema,
  type Submission,
  type SubmitInput,
  type WebProject,
} from "@/domain/models/submission";
import type { SubmissionRepository } from "@/domain/ports/SubmissionRepository";
import { getSupabaseClient } from "./client";

const TABLE = "submissions";

/** Forma de una fila de la tabla `submissions` en Postgres. */
interface DbRow {
  id: string;
  assignment_id: string;
  activity_title: string;
  student_id: string;
  student_name: string;
  kind: "python" | "web" | "scratch";
  code: string | null;
  project: WebProject | null;
  project_sb3: string | null;
  submitted_at: string;
  grade: number | null;
  comment: string | null;
  graded_at: string | null;
}

/** Adaptador de persistencia de entregas sobre Supabase (Postgres + RLS). */
export class SupabaseSubmissionRepository implements SubmissionRepository {
  private supabase = getSupabaseClient();

  private toDomain(row: DbRow): Submission | null {
    const base = {
      id: row.id,
      activityId: row.assignment_id,
      activityTitle: row.activity_title,
      student: row.student_id,
      studentName: row.student_name,
      submittedAt: new Date(row.submitted_at).getTime(),
      grade: row.grade,
      comment: row.comment ?? "",
      gradedAt: row.graded_at ? new Date(row.graded_at).getTime() : null,
    };
    const candidate =
      row.kind === "python"
        ? { ...base, kind: "python", code: row.code ?? "" }
        : row.kind === "web"
          ? { ...base, kind: "web", project: row.project }
          : { ...base, kind: "scratch", project: row.project_sb3 ?? "" };
    const parsed = submissionSchema.safeParse(candidate);
    return parsed.success ? parsed.data : null;
  }

  private mapMany(rows: DbRow[]): Submission[] {
    return rows.flatMap((r) => {
      const s = this.toDomain(r);
      return s ? [s] : [];
    });
  }

  async getAll(): Promise<Submission[]> {
    const { data, error } = await this.supabase
      .from(TABLE)
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) throw new Error(error.message);
    return this.mapMany((data ?? []) as DbRow[]);
  }

  async getByStudent(studentId: string): Promise<Submission[]> {
    const { data, error } = await this.supabase
      .from(TABLE)
      .select("*")
      .eq("student_id", studentId)
      .order("submitted_at", { ascending: false });
    if (error) throw new Error(error.message);
    return this.mapMany((data ?? []) as DbRow[]);
  }

  async getById(id: string): Promise<Submission | null> {
    const { data, error } = await this.supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? this.toDomain(data as DbRow) : null;
  }

  async submit(input: SubmitInput): Promise<Submission> {
    const row = {
      assignment_id: input.activityId,
      activity_title: input.activityTitle,
      student_id: input.student,
      student_name: input.studentName,
      kind: input.kind,
      code: input.kind === "python" ? input.code : null,
      project: input.kind === "web" ? input.project : null,
      project_sb3: input.kind === "scratch" ? input.project : null,
      submitted_at: new Date().toISOString(),
      // Reenviar reinicia la calificación a pendiente.
      grade: null,
      comment: "",
      graded_at: null,
    };
    const { data, error } = await this.supabase
      .from(TABLE)
      .upsert(row, { onConflict: "assignment_id,student_id" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    const submission = this.toDomain(data as DbRow);
    if (!submission)
      throw new Error("Entrega inválida devuelta por el servidor");
    return submission;
  }

  async grade(
    submissionId: string,
    grade: number,
    comment: string,
  ): Promise<void> {
    const { error } = await this.supabase
      .from(TABLE)
      .update({ grade, comment, graded_at: new Date().toISOString() })
      .eq("id", submissionId);
    if (error) throw new Error(error.message);
  }
}
