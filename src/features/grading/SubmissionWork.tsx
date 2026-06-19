import type { Submission, WebProject } from "@/domain/models/submission";
import { buildPreviewDoc } from "@/lib/preview";
import { base64ToBytes } from "@/lib/base64";

/**
 * Muestra el trabajo de una entrega según su tipo. El `switch` sobre `kind` es
 * exhaustivo por la unión discriminada: si se añade un curso, TypeScript obliga
 * a contemplarlo aquí.
 */
export function SubmissionWork({ submission }: { submission: Submission }) {
  switch (submission.kind) {
    case "python":
      return <pre className="code-preview">{submission.code}</pre>;
    case "web":
      return <WebWork project={submission.project} />;
    case "scratch":
      return (
        <ScratchWork
          base64={submission.project}
          name={submission.studentName || submission.student}
        />
      );
  }
}

function WebWork({ project }: { project: WebProject }) {
  const code =
    "<!-- HTML -->\n" +
    project.html +
    "\n\n/* CSS */\n" +
    project.css +
    "\n\n// JS\n" +
    project.js;
  return (
    <>
      <iframe
        className="review-preview"
        sandbox="allow-scripts allow-modals"
        srcDoc={buildPreviewDoc(project)}
      />
      <details className="code-details">
        <summary>Ver código</summary>
        <pre className="code-preview">{code}</pre>
      </details>
    </>
  );
}

function ScratchWork({ base64, name }: { base64: string; name: string }) {
  function download() {
    const bytes = base64ToBytes(base64);
    const url = URL.createObjectURL(
      new Blob([bytes], { type: "application/x.scratch.sb3" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = name + ".sb3";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="scratch-actions">
      <button className="btn btn-ghost" onClick={download}>
        ⬇ Descargar .sb3
      </button>
      <span className="muted-line">
        Abrir para revisar dentro de la app: Fase 4e (editor de Scratch).
      </span>
    </div>
  );
}
