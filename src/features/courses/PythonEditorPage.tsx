import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { editorTooltips } from "@/features/courses/codemirror";
import { getCourse } from "@/courses/registry";
import { getCurriculum } from "@/courses/curriculum";
import { getSesionContenido } from "@/domain/models/curriculum";
import type { PythonAssignment } from "@/courses/python";
import { submissionRepository } from "@/app/services";
import { submitAssignment } from "@/application/submitAssignment";
import { useAuth } from "@/features/auth/auth-context";
import { TaskPanel } from "@/features/courses/TaskPanel";
import { lessonAssignments } from "@/features/courses/lessonTasks";
import { usePythonRunner } from "@/features/courses/usePythonRunner";
import { animateTurtle } from "@/features/courses/turtleCanvas";

const pythonCourse = getCourse("python");
const pythonCurriculum = getCurriculum("python");
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

  // Lección activa (si se llegó desde el selector con ?periodo=&sesion=).
  const [searchParams] = useSearchParams();
  const periodo = Number(searchParams.get("periodo"));
  const sesion = Number(searchParams.get("sesion"));
  const leccion =
    pythonCurriculum && Number.isInteger(periodo) && Number.isInteger(sesion)
      ? getSesionContenido(pythonCurriculum, periodo, sesion)
      : undefined;

  // Tareas activas: las de la lección (varias) o las del curso por defecto.
  const assignments = leccion
    ? lessonAssignments(periodo, sesion, leccion)
    : pythonCourse.assignments;

  const [code, setCode] = useState(DEFAULT_CODE);
  const [taskIndex, setTaskIndex] = useState(0);
  // Con lección, el panel de tarea se abre solo.
  const [showTask, setShowTask] = useState(!!leccion);
  const [inputValue, setInputValue] = useState("");

  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turtleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Anima el dibujo de turtle en el canvas cuando llega un nuevo resultado.
  useEffect(() => {
    if (!runner.turtleData || !turtleCanvasRef.current) return;
    return animateTurtle(turtleCanvasRef.current, runner.turtleData);
  }, [runner.turtleData]);

  // Autoscroll de la consola y foco en el campo de entrada cuando se solicita.
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
    if (runner.awaitingInput) inputRef.current?.focus();
  }, [runner.output, runner.awaitingInput]);

  function loadBase() {
    const base = assignments[taskIndex].codigoBase;
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

  // Actividad seleccionada (de la lección o del curso por defecto).
  const task: PythonAssignment = assignments[taskIndex];
  // En la entrega, anteponemos el contexto de la lección para calificar.
  const entrega: PythonAssignment = leccion
    ? { ...task, titulo: `P${periodo}·S${sesion} · ${task.titulo}` }
    : task;

  async function submit() {
    if (!user) return;
    if (!code.trim()) {
      alert("Escribe algo de código antes de entregar.");
      return;
    }
    if (
      !confirm(
        `¿Entregar tu solución de "${entrega.titulo}"?\nSi ya habías entregado, se reemplazará y quedará pendiente.`,
      )
    )
      return;
    await submitAssignment(
      submissionRepository,
      pythonCourse.buildSubmitInput({
        assignment: entrega,
        student: user,
        content: { code },
      }),
    );
    alert("✓ Entrega registrada. Podrás ver tu calificación en “Mis notas”.");
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <span className="title">
          🐍{" "}
          {leccion
            ? `P${periodo} · S${sesion}: ${leccion.titulo}`
            : "Editor de Python"}
        </span>
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

      <div className={"editor-body" + (runner.turtleData ? " turtle-on" : "")}>
        {showTask && (
          <TaskPanel
            assignments={assignments}
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
          {runner.turtleData && (
            <div className="turtle-wrap">
              <canvas
                ref={turtleCanvasRef}
                className="turtle-canvas"
                aria-label="Dibujo de turtle"
              />
            </div>
          )}
          <div className="pane-header">Consola de salida</div>
          <div
            className={"console" + (runner.turtleData ? " compact" : "")}
            ref={consoleRef}
          >
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
