import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { javascript as jsLang } from "@codemirror/lang-javascript";
import { getCourse } from "@/courses/registry";
import { webProjectSchema, type WebProject } from "@/domain/models/submission";
import { submissionRepository } from "@/app/services";
import { submitAssignment } from "@/application/submitAssignment";
import { buildPreviewDoc } from "@/lib/preview";
import { useAuth } from "@/features/auth/auth-context";
import { TaskPanel } from "@/features/courses/TaskPanel";
import { JoinClassButton } from "@/features/courses/JoinClassButton";

const webCourse = getCourse("web");
type Tab = "html" | "css" | "js";
const TABS: Tab[] = ["html", "css", "js"];
const LANG = { html: htmlLang(), css: cssLang(), js: jsLang() };

/** Editor de Diseño Web: HTML/CSS/JS + vista previa en vivo. Migra web.js. */
export function WebEditorPage() {
  const { user } = useAuth();
  const isStudent = user?.role === "estudiante";
  const storageKey = "lucksoft_web_" + (user?.id ?? "anon");

  const [project, setProject] = useState<WebProject>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = webProjectSchema.safeParse(JSON.parse(saved));
        if (parsed.success) return parsed.data;
      }
    } catch {
      /* dato corrupto: usar la tarea por defecto */
    }
    return webCourse.assignments[0].base;
  });
  const [tab, setTab] = useState<Tab>("html");
  const [taskIndex, setTaskIndex] = useState(0);
  const [showTask, setShowTask] = useState(false);
  const [doc, setDoc] = useState(() => buildPreviewDoc(project));
  const [status, setStatus] = useState("");

  // Vista previa + autoguardado, con rebote de 400 ms. El estado "Actualizando…"
  // se marca en los manejadores de cambio (eventos), no aquí, para no disparar
  // renders en cascada desde el efecto.
  useEffect(() => {
    const t = setTimeout(() => {
      setDoc(buildPreviewDoc(project));
      localStorage.setItem(storageKey, JSON.stringify(project));
      setStatus("Vista previa actualizada ✓");
    }, 400);
    return () => clearTimeout(t);
  }, [project, storageKey]);

  const handleChange = (field: Tab) => (value: string) => {
    setStatus("Actualizando…");
    setProject((p) => ({ ...p, [field]: value }));
  };

  function loadBase() {
    if (!confirm("Esto reemplazará tu código actual. ¿Continuar?")) return;
    setStatus("Actualizando…");
    setProject(webCourse.assignments[taskIndex].base);
  }

  async function submit() {
    if (!user) return;
    const task = webCourse.assignments[taskIndex];
    if (!confirm(`¿Entregar tu solución de "${task.titulo}"?`)) return;
    await submitAssignment(
      submissionRepository,
      webCourse.buildSubmitInput({
        assignment: task,
        student: user,
        content: project,
      }),
    );
    alert('✓ Entrega registrada. El docente podrá verla en "Calificar".');
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <span className="title">🎨 Diseño Web</span>
        <JoinClassButton course="Web" />
        <button
          className={"btn btn-ghost" + (showTask ? " active" : "")}
          onClick={() => setShowTask((v) => !v)}
        >
          📋 Tarea
        </button>
        <span className="status">{status}</span>
        {isStudent && (
          <button className="btn btn-primary" onClick={submit}>
            ✓ Entregar
          </button>
        )}
      </div>

      <div className="editor-body">
        {showTask && (
          <TaskPanel
            assignments={webCourse.assignments}
            index={taskIndex}
            onSelect={setTaskIndex}
            onLoadBase={loadBase}
          />
        )}

        <div className="code-pane">
          <div className="tabbar">
            {TABS.map((t) => (
              <button
                key={t}
                className={"tab" + (tab === t ? " active" : "")}
                onClick={() => setTab(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          {TABS.map((t) => (
            <div
              key={t}
              className="editor-host"
              style={{ display: tab === t ? "block" : "none" }}
            >
              <CodeMirror
                value={project[t]}
                theme="dark"
                height="100%"
                extensions={[LANG[t]]}
                onChange={handleChange(t)}
              />
            </div>
          ))}
        </div>

        <div className="preview-pane">
          <div className="pane-header">Vista previa</div>
          <iframe
            className="preview-frame"
            sandbox="allow-scripts allow-modals"
            srcDoc={doc}
            title="Vista previa"
          />
        </div>
      </div>
    </div>
  );
}
