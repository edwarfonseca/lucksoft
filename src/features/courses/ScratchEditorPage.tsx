import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourse } from "@/courses/registry";
import { getCurriculum } from "@/courses/curriculum";
import { getSesionContenido } from "@/domain/models/curriculum";
import { submissionRepository } from "@/app/services";
import { submitAssignment } from "@/application/submitAssignment";
import { getSubmissionById } from "@/application/listSubmissions";
import { base64ToBytes, bytesToBase64 } from "@/lib/base64";
import { useAuth } from "@/features/auth/auth-context";
import { TaskPanel } from "@/features/courses/TaskPanel";
import { lessonActivities } from "@/features/courses/lessonTasks";
import type { ScratchVM, ScratchWindow } from "@/features/courses/scratchVm";

const scratchCourse = getCourse("scratch");
const scratchCurriculum = getCurriculum("scratch");
const EDITOR_PATH = "/scratch-editor/editor.html";

/**
 * Editor de Scratch: embebe TurboWarp en un iframe y accede a su motor
 * (window.vm) para autoguardar, entregar y revisar. Migra scratch.js.
 *
 * El build de TurboWarp no está en git (ver PLAN.md): debe estar en
 * public/scratch-editor/ con el parche isInvalidEmbed=false.
 */
export function ScratchEditorPage() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const reviewId = params.get("review");
  const isReview = !!reviewId;
  const isStudent = user?.role === "estudiante";

  // Lección activa (si se llegó desde el selector con ?periodo=&sesion=).
  const periodo = Number(params.get("periodo"));
  const sesion = Number(params.get("sesion"));
  const leccion =
    scratchCurriculum && Number.isInteger(periodo) && Number.isInteger(sesion)
      ? getSesionContenido(scratchCurriculum, periodo, sesion)
      : undefined;
  const tareas = leccion ? lessonActivities(periodo, sesion, leccion) : [];
  const [taskIndex, setTaskIndex] = useState(0);
  const [showTask, setShowTask] = useState(!!leccion);

  const [buildStatus, setBuildStatus] = useState<"checking" | "ok" | "missing">(
    "checking",
  );
  const [status, setStatus] = useState("Cargando editor de Scratch…");
  const [statusErr, setStatusErr] = useState(false);

  const frameRef = useRef<HTMLIFrameElement>(null);
  const vmRef = useRef<ScratchVM | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const storageKey = "lucksoft_scratch_proj_" + (user?.id ?? "anon");

  function say(text: string, err = false) {
    setStatus(text);
    setStatusErr(err);
  }

  // ¿Está instalado el build?
  useEffect(() => {
    fetch(EDITOR_PATH, { method: "HEAD" })
      .then((r) => setBuildStatus(r.ok ? "ok" : "missing"))
      .catch(() => setBuildStatus("missing"));
  }, []);

  // Espera al motor y arranca la integración cuando el iframe carga.
  useEffect(() => {
    if (buildStatus !== "ok") return;
    const frame = frameRef.current;
    if (!frame) return;
    let cancelled = false;
    let tries = 0;

    async function saveLocal() {
      const vm = vmRef.current;
      if (!vm) return;
      try {
        const blob = await vm.saveProjectSb3();
        const buf = await blob.arrayBuffer();
        localStorage.setItem(storageKey, bytesToBase64(buf));
        say("Guardado ✓ " + new Date().toLocaleTimeString("es"));
      } catch {
        say("No se pudo autoguardar (¿proyecto muy grande?)", true);
      }
    }

    async function restoreLocal(vm: ScratchVM) {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        say("Proyecto nuevo");
        return;
      }
      try {
        await vm.loadProject(base64ToBytes(saved));
        say("Proyecto restaurado ✓");
      } catch (e) {
        say("No se pudo restaurar: " + describe(e), true);
      }
    }

    async function loadReview(vm: ScratchVM) {
      const sub = reviewId
        ? await getSubmissionById(submissionRepository, reviewId)
        : null;
      if (!sub || sub.kind !== "scratch") {
        say("Entrega no encontrada", true);
        return;
      }
      try {
        await vm.loadProject(base64ToBytes(sub.project));
        say("Pulsa la bandera verde para ejecutar el proyecto");
      } catch (e) {
        say("No se pudo cargar: " + describe(e), true);
      }
    }

    async function onReady(vm: ScratchVM) {
      if (isReview) {
        await loadReview(vm);
        return;
      }
      await restoreLocal(vm);
      vm.on("PROJECT_CHANGED", () => {
        say("Guardando…");
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(saveLocal, 1500);
      });
    }

    function waitForVm() {
      if (cancelled) return;
      const w = frame!.contentWindow as ScratchWindow | null;
      const vm = w?.vm;
      const ready = vm && vm.runtime && vm.editingTarget;
      if (ready || (vm && vm.runtime && tries > 40)) {
        vmRef.current = vm!;
        void onReady(vm!);
      } else {
        tries++;
        setTimeout(waitForVm, 250);
      }
    }

    frame.addEventListener("load", waitForVm);
    return () => {
      cancelled = true;
      frame.removeEventListener("load", waitForVm);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [buildStatus, isReview, reviewId, storageKey]);

  async function manualSave() {
    const vm = vmRef.current;
    if (!vm) return;
    try {
      const blob = await vm.saveProjectSb3();
      const buf = await blob.arrayBuffer();
      localStorage.setItem(storageKey, bytesToBase64(buf));
      say("Guardado ✓ " + new Date().toLocaleTimeString("es"));
    } catch {
      say("No se pudo guardar", true);
    }
  }

  async function entregar() {
    const vm = vmRef.current;
    if (!vm || !user) return;
    try {
      say("Preparando entrega…");
      const blob = await vm.saveProjectSb3();
      const buf = await blob.arrayBuffer();
      await submitAssignment(
        submissionRepository,
        scratchCourse.buildSubmitInput({
          assignment: scratchCourse.assignments[0],
          student: user,
          content: { projectBase64: bytesToBase64(buf) },
        }),
      );
      say("Entregado ✓");
      alert('✓ Proyecto entregado. El docente podrá revisarlo en "Calificar".');
    } catch (e) {
      say("Error al entregar", true);
      alert("No se pudo entregar el proyecto: " + describe(e));
    }
  }

  if (buildStatus === "missing") return <BuildHelp />;

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <span className="title">
          {isReview
            ? "🐱 Revisando proyecto"
            : leccion
              ? `🐱 P${periodo} · S${sesion}: ${leccion.titulo}`
              : "🐱 Proyecto de Scratch"}
        </span>
        {leccion && (
          <button
            className={"btn btn-ghost" + (showTask ? " active" : "")}
            onClick={() => setShowTask((v) => !v)}
          >
            📋 Tarea
          </button>
        )}
        <span className={"status" + (statusErr ? " err" : "")}>{status}</span>
        {!isReview && (
          <button className="btn btn-ghost" onClick={manualSave}>
            💾 Guardar
          </button>
        )}
        {!isReview && isStudent && (
          <button className="btn btn-primary" onClick={entregar}>
            ✓ Entregar
          </button>
        )}
      </div>
      <div className="editor-body">
        {showTask && leccion && (
          <TaskPanel
            assignments={tareas}
            index={taskIndex}
            onSelect={setTaskIndex}
          />
        )}
        <iframe
          ref={frameRef}
          className="scratch-frame"
          src={EDITOR_PATH}
          allow="fullscreen"
          title="Editor de Scratch"
        />
      </div>
    </div>
  );
}

function describe(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function BuildHelp() {
  return (
    <div className="page">
      <h1>Editor de Scratch — pendiente de instalar</h1>
      <p className="lead">
        El editor (build de TurboWarp) no está en{" "}
        <code>public/scratch-editor/</code>. Compílalo una vez y cópialo ahí.
      </p>
      <pre className="code-preview">{`git clone --depth=1 https://github.com/TurboWarp/scratch-gui
cd scratch-gui && npm install && npm run build
# copia build/ a public/scratch-editor/ y aplica el parche isInvalidEmbed=false`}</pre>
    </div>
  );
}
