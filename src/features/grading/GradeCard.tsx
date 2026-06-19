import { useState } from "react";
import type { Submission } from "@/domain/models/submission";
import { submissionRepository } from "@/app/services";
import {
  gradeSubmission,
  ValidationError,
} from "@/application/gradeSubmission";
import { formatDateTime } from "@/lib/format";
import { SubmissionWork } from "@/features/grading/SubmissionWork";

/** Tarjeta de una entrega con su trabajo y el formulario de calificación. */
export function GradeCard({
  submission,
  onGraded,
}: {
  submission: Submission;
  onGraded: () => void;
}) {
  const graded = submission.grade !== null;
  const [grade, setGrade] = useState(submission.grade?.toString() ?? "");
  const [comment, setComment] = useState(submission.comment);
  const [error, setError] = useState("");

  async function save() {
    setError("");
    try {
      await gradeSubmission(
        submissionRepository,
        submission.id,
        parseInt(grade, 10),
        comment,
      );
      onGraded();
    } catch (e) {
      setError(
        e instanceof ValidationError
          ? e.message
          : "No se pudo guardar la nota.",
      );
    }
  }

  return (
    <div className="grade-card">
      <div className="grade-card-head">
        <h3>{submission.activityTitle}</h3>
        {graded ? (
          <span className="grade-pill">{submission.grade}/100</span>
        ) : (
          <span className="tag soon">Pendiente</span>
        )}
      </div>
      <p className="muted-line">
        {submission.studentName || submission.student} · entregado{" "}
        {formatDateTime(submission.submittedAt)}
      </p>

      <SubmissionWork submission={submission} />

      <div className="grade-form">
        <label>
          Nota (0–100)
          <input
            type="number"
            min={0}
            max={100}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </label>
        <label className="grow">
          Comentario
          <input
            type="text"
            value={comment}
            placeholder="Retroalimentación para el estudiante"
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" onClick={save}>
          Guardar
        </button>
      </div>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
