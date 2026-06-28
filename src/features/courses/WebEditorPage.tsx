import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import {
  javascript as jsLang,
  javascriptLanguage,
  scopeCompletionSource,
} from "@codemirror/lang-javascript";
import type { Extension } from "@codemirror/state";
import { editorTooltips } from "@/features/courses/codemirror";
import { getCourse } from "@/courses/registry";
import { getCurriculum } from "@/courses/curriculum";
import { getSesionContenido } from "@/domain/models/curriculum";
import { webProjectSchema, type WebProject } from "@/domain/models/submission";
import { submissionRepository } from "@/app/services";
import { submitAssignment } from "@/application/submitAssignment";
import { buildPreviewDoc } from "@/lib/preview";
import { useAuth } from "@/features/auth/auth-context";
import { TaskPanel } from "@/features/courses/TaskPanel";
import { lessonWebAssignments } from "@/features/courses/lessonTasks";

const webCourse = getCourse("web");
const webCurriculum = getCurriculum("web");
type Tab = "html" | "css" | "js";
const TABS: Tab[] = ["html", "css", "js"];

// Extensiones por lenguaje. JS añade autocompletado de los globales del
// navegador (document, console, Math…) y sus métodos, como un editor real.
const EXTENSIONS: Record<Tab, Extension[]> = {
  html: [htmlLang(), editorTooltips],
  css: [cssLang(), editorTooltips],
  js: [
    jsLang(),
    javascriptLanguage.data.of({
      autocomplete: scopeCompletionSource(globalThis),
    }),
    editorTooltips,
  ],
};

/** Editor de Diseño Web: HTML/CSS/JS + vista previa en vivo. Migra web.js. */
export function WebEditorPage() {
  const { user } = useAuth();
  const isStudent = user?.role === "estudiante";
  const storageKey = "lucksoft_web_" + (user?.id ?? "anon");

  // Lección activa (si se llegó desde el selector con ?periodo=&sesion=).
  const [searchParams] = useSearchParams();
  const periodo = Number(searchParams.get("periodo"));
  const sesion = Number(searchParams.get("sesion"));
  const leccion =
    webCurriculum && Number.isInteger(periodo) && Number.isInteger(sesion)
      ? getSesionContenido(webCurriculum, periodo, sesion)
      : undefined;

  // Tareas activas: las de la lección (varias) o las del curso por defecto.
  const assignments = leccion
    ? lessonWebAssignments(periodo, sesion, leccion)
    : webCourse.assignments;

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
  // Con lección, el panel de tarea se abre solo.
  const [showTask, setShowTask] = useState(!!leccion);
  const [doc, setDoc] = useState(() => buildPreviewDoc(project));
  const [status, setStatus] = useState("");
  // Alto (px) de los paneles de código y vista previa; el usuario lo ajusta
  // arrastrando la barra inferior del editor. Arranca proporcional a la ventana.
  const [paneH, setPaneH] = useState(() =>
    Math.max(320, Math.min(720, window.innerHeight - 260)),
  );

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
    setProject(assignments[taskIndex].base);
  }

  // Arrastra la barra inferior para ampliar/reducir el área de código (y la
  // vista previa, que mantiene la misma altura).
  function startResize(e: React.PointerEvent) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = paneH;
    const onMove = (ev: PointerEvent) =>
      setPaneH(Math.max(160, Math.min(1200, startH + ev.clientY - startY)));
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  async function submit() {
    if (!user) return;
    const task = assignments[taskIndex];
    // Con lección, anteponemos el contexto (P·S) para que el docente lo ubique.
    const entrega = leccion
      ? { ...task, titulo: `P${periodo}·S${sesion} · ${task.titulo}` }
      : task;
    if (!confirm(`¿Entregar tu solución de "${entrega.titulo}"?`)) return;
    await submitAssignment(
      submissionRepository,
      webCourse.buildSubmitInput({
        assignment: entrega,
        student: user,
        content: project,
      }),
    );
    alert('✓ Entrega registrada. El docente podrá verla en "Calificar".');
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <span className="title">
          🎨{" "}
          {leccion
            ? `P${periodo} · S${sesion}: ${leccion.titulo}`
            : "Diseño Web"}
        </span>
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

      <div className="editor-body editor-body--resizable">
        {showTask && (
          <TaskPanel
            assignments={assignments}
            index={taskIndex}
            onSelect={setTaskIndex}
            onLoadBase={loadBase}
          />
        )}

        <div className="code-pane code-pane--tabs" style={{ height: paneH }}>
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
              className={"editor-host" + (tab === t ? "" : " is-hidden")}
            >
              <CodeMirror
                value={project[t]}
                theme="dark"
                height="100%"
                extensions={EXTENSIONS[t]}
                onChange={handleChange(t)}
              />
            </div>
          ))}
          <div
            className="pane-resizer"
            onPointerDown={startResize}
            role="separator"
            aria-orientation="horizontal"
            title="Arrastra para ampliar o reducir el editor"
          />
        </div>

        <div className="preview-pane" style={{ height: paneH }}>
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
