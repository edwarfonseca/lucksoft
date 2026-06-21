import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { editorTooltips } from "@/features/courses/codemirror";
import { getCourse } from "@/courses/registry";
import { submissionRepository } from "@/app/services";
import { submitAssignment } from "@/application/submitAssignment";
import { useAuth } from "@/features/auth/auth-context";
import { TaskPanel } from "@/features/courses/TaskPanel";
import { JoinClassButton } from "@/features/courses/JoinClassButton";
import { usePythonRunner } from "@/features/courses/usePythonRunner";

const pythonCourse = getCourse("python");
const DEFAULT_CODE = `# ¡Bienvenido a LuckSoft! Escribe Python y pulsa Ejecutar.
nombre = "estudiante"
print(f"Hola, {nombre} 👋")

for i in range(1, 6):
    print(f"{i} x {i} = {i * i}")
`;

/** Editor de Python: CodeMirror + Pyodide en un Web Worker. Migra editor.js. */
export function PythonEditorPage() {
  const { user } = useAuth();
  const isStudent = user?.role === "estudiante";
  const runner = usePythonRunner();

  const [code, setCode] = useState(DEFAULT_CODE);
  const [taskIndex, setTaskIndex] = useState(0);
  const [showTask, setShowTask] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autoscroll de la consola y foco en el campo de entrada cuando se solicita.
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
    if (runner.awaitingInput) inputRef.current?.focus();
  }, [runner.output, runner.awaitingInput]);

  function loadBase() {
    const base = pythonCourse.assignments[taskIndex].codigoBase;
    if (!base) return;
    if (
      code.trim() &&
      !confirm("Esto reemplazará tu código actual. ¿Continuar?")
    )
      return;
    setCode(base);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    runner.submitInput(inputValue);
    setInputValue("");
  }

  async function submit() {
    if (!user) return;
    const task = pythonCourse.assignments[taskIndex];
    if (!code.trim()) {
      alert("Escribe algo de código antes de entregar.");
      return;
    }
    if (
      !confirm(
        `¿Entregar tu solución de "${task.titulo}"?\nSi ya habías entregado, se reemplazará y quedará pendiente.`,
      )
    )
      return;
    await submitAssignment(
      submissionRepository,
      pythonCourse.buildSubmitInput({
        assignment: task,
        student: user,
        content: { code },
      }),
    );
    alert("✓ Entrega registrada. Podrás ver tu calificación en “Mis notas”.");
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <span className="title">🐍 Editor de Python</span>
        <JoinClassButton course="Python" />
        <button
          className={"btn btn-ghost" + (showTask ? " active" : "")}
          onClick={() => setShowTask((v) => !v)}
        >
          📋 Tarea
        </button>
        <span className="status">{runner.status}</span>
        <button
          className="btn btn-primary"
          disabled={!runner.ready || runner.running}
          onClick={() => runner.run(code)}
        >
          ▶ Ejecutar
        </button>
        {runner.canUseWorker && (
          <button
            className="btn btn-ghost"
            disabled={!runner.running}
            onClick={runner.stop}
          >
            ⏹ Detener
          </button>
        )}
        <button className="btn btn-ghost" onClick={runner.clear}>
          Limpiar
        </button>
        {isStudent && (
          <button className="btn btn-primary" onClick={submit}>
            ✓ Entregar
          </button>
        )}
      </div>

      <div className="editor-body">
        {showTask && (
          <TaskPanel
            assignments={pythonCourse.assignments}
            index={taskIndex}
            onSelect={setTaskIndex}
            onLoadBase={loadBase}
          />
        )}

        <div className="code-pane">
          <div className="pane-header">Código</div>
          <div className="editor-host">
            <CodeMirror
              value={code}
              theme="dark"
              height="100%"
              extensions={[python(), editorTooltips]}
              onChange={setCode}
            />
          </div>
        </div>

        <div className="preview-pane">
          <div className="pane-header">Consola de salida</div>
          <div className="console" ref={consoleRef}>
            {runner.output.map((seg, i) => (
              <span key={i} className={seg.error ? "err" : undefined}>
                {seg.text}
              </span>
            ))}
            {runner.awaitingInput && (
              <input
                ref={inputRef}
                className="console-input"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={onInputKeyDown}
              />
            )}
          </div>
          {!runner.canUseWorker && (
            <p className="notice">
              El editor de Python necesita aislamiento de origen (COOP/COEP).
              Con <code>npm run dev</code> ya está activo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
