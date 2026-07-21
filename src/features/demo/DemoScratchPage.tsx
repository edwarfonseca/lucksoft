import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ScratchVM, ScratchWindow } from "@/features/courses/scratchVm";
import {
  DemoFinal,
  DemoHeader,
  GuiaLucky,
  type EstadoGuia,
} from "@/features/demo/guia";
import { PASOS_SCRATCH, XP_TOTAL_SCRATCH } from "@/features/demo/pasosScratch";

/**
 * Prueba gratis pública de Scratch (/prueba-scratch), para 7-9 años. Su par
 * de Python vive en /prueba-python. TurboWarp
 * embebido y Lucky detectando EN VIVO los bloques que el niño arrastra
 * (PROJECT_CHANGED), sin registro y sin tocar la base de datos.
 */

const EDITOR_PATH = "/scratch-editor/editor.html";

const INTRO_MENSAJES = [
  "¡Hola! Soy Lucky 🤖 y el personaje de ahí abajo… está esperando TUS órdenes.",
  "Tenemos 3 misiones. Si las completas, ganas 100 XP y el título de Programador Novato. ¿Aceptas?",
];

const FINAL_MENSAJE =
  "¡MISIÓN CUMPLIDA! 🏅 100 XP. Corre a mostrarle a tu familia tu personaje arcoíris parlanchín.";

/** Estructura interna mínima de los bloques del motor (no tipada en ScratchVM). */
interface RuntimeConBloques {
  targets?: { blocks?: { _blocks?: Record<string, { opcode?: string }> } }[];
}

/** Recolecta los opcodes de todos los bloques que el niño ha puesto. */
function opcodesDelProyecto(vm: ScratchVM): Set<string> {
  const ops = new Set<string>();
  const runtime = vm.runtime as RuntimeConBloques;
  for (const t of runtime.targets ?? []) {
    const blocks = t.blocks?._blocks ?? {};
    for (const id in blocks) {
      const op = blocks[id].opcode;
      if (op) ops.add(op);
    }
  }
  return ops;
}

export function DemoScratchPage() {
  const [fase, setFase] = useState<"intro" | "final" | number>("intro");
  const [xp, setXp] = useState(0);
  const [logradas, setLogradas] = useState<boolean[]>(
    PASOS_SCRATCH.map(() => false),
  );
  const [cola, setCola] = useState<string[]>(INTRO_MENSAJES);
  const [estadoGuia, setEstadoGuia] = useState<EstadoGuia>("hola");
  const [pasoLogrado, setPasoLogrado] = useState(false);
  const [buildStatus, setBuildStatus] = useState<"checking" | "ok" | "missing">(
    "checking",
  );
  // Aumenta con cada cambio del proyecto (bloques puestos/quitados).
  const [cambios, setCambios] = useState(0);

  const frameRef = useRef<HTMLIFrameElement>(null);
  const vmRef = useRef<ScratchVM | null>(null);

  const paso = typeof fase === "number" ? PASOS_SCRATCH[fase] : null;

  // ¿Está instalado el build de TurboWarp?
  useEffect(() => {
    fetch(EDITOR_PATH, { method: "HEAD" })
      .then((r) => setBuildStatus(r.ok ? "ok" : "missing"))
      .catch(() => setBuildStatus("missing"));
  }, []);

  // Espera al motor del iframe y escucha los cambios del proyecto.
  useEffect(() => {
    if (buildStatus !== "ok") return;
    const frame = frameRef.current;
    if (!frame) return;
    let cancelled = false;
    let tries = 0;

    function waitForVm() {
      if (cancelled) return;
      const w = frame!.contentWindow as ScratchWindow | null;
      const vm = w?.vm;
      const ready = vm && vm.runtime && vm.editingTarget;
      if (ready || (vm && vm.runtime && tries > 40)) {
        vmRef.current = vm!;
        vm!.on("PROJECT_CHANGED", () => setCambios((c) => c + 1));
      } else {
        tries++;
        setTimeout(waitForVm, 250);
      }
    }

    frame.addEventListener("load", waitForVm);
    return () => {
      cancelled = true;
      frame.removeEventListener("load", waitForVm);
    };
  }, [buildStatus]);

  // Lucky evalúa la misión cada vez que el proyecto cambia.
  useEffect(() => {
    if (!paso || pasoLogrado || !vmRef.current || cambios === 0) return;
    const ops = opcodesDelProyecto(vmRef.current);
    if (!paso.exito(ops)) return;
    const idx = fase as number;
    setTimeout(() => {
      setXp((x) => x + paso.xp);
      setLogradas((ls) => ls.map((v, i) => (i === idx ? true : v)));
      setPasoLogrado(true);
      setEstadoGuia("celebra");
      setCola([paso.festejo]);
    }, 400);
  }, [cambios, paso, pasoLogrado, fase]);

  function empezarPaso(i: number) {
    setFase(i);
    setCola(PASOS_SCRATCH[i].mensajes);
    setEstadoGuia("habla");
    setPasoLogrado(false);
    // Reevaluar de una vez por si el bloque ya está puesto de antes.
    setCambios((c) => c + 1);
  }

  function siguiente() {
    const idx = fase as number;
    if (idx + 1 < PASOS_SCRATCH.length) {
      empezarPaso(idx + 1);
    } else {
      setFase("final");
      setCola([FINAL_MENSAJE]);
      setEstadoGuia("celebra");
    }
  }

  function reiniciar() {
    setXp(0);
    setLogradas(PASOS_SCRATCH.map(() => false));
    empezarPaso(0);
  }

  return (
    <div className="demo-page demo-page-scratch">
      <DemoHeader
        titulos={PASOS_SCRATCH.map((p) => p.titulo)}
        logradas={logradas}
        actual={typeof fase === "number" ? fase : null}
        xp={xp}
      />

      <GuiaLucky
        estado={estadoGuia}
        mensaje={cola.length > 0 ? cola[0] : null}
        acciones={
          <>
            {cola.length > 1 && (
              <button
                className="btn btn-ghost"
                onClick={() => setCola((c) => c.slice(1))}
              >
                Siguiente ➜
              </button>
            )}
            {fase === "intro" && cola.length <= 1 && (
              <button
                className="btn btn-primary"
                onClick={() => empezarPaso(0)}
              >
                🚀 ¡Acepto la misión!
              </button>
            )}
            {paso && !pasoLogrado && cola.length <= 1 && (
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setEstadoGuia("piensa");
                  setCola([paso.pista]);
                }}
              >
                💡 Dame una pista
              </button>
            )}
            {pasoLogrado && typeof fase === "number" && (
              <button className="btn btn-primary" onClick={siguiente}>
                {fase + 1 < PASOS_SCRATCH.length
                  ? "Siguiente misión ➜"
                  : "🏁 Terminar la aventura"}
              </button>
            )}
          </>
        }
      />

      {fase === "intro" && (
        <p className="demo-switch">
          🐍 ¿Ya tienes 10 años o más? Prueba también la{" "}
          <Link to="/prueba-python">aventura de Python</Link>.
        </p>
      )}

      {paso && (
        <>
          <h1 className="demo-titulo">{paso.titulo}</h1>
          <p className="demo-instruccion">🎯 {paso.instruccion}</p>
        </>
      )}

      {buildStatus === "missing" && (
        <p className="notice">
          El editor de Scratch no está disponible en este momento. Intenta más
          tarde o prueba la <Link to="/prueba-python">aventura de Python</Link>.
        </p>
      )}

      {buildStatus === "ok" && (
        // Siempre montado: si se desmontara, se perderían el proyecto del niño
        // y el detector de bloques. En la intro se ve atenuado (va cargando) y
        // en el final se oculta.
        <div
          className={
            "demo-scratch-wrap" +
            (fase === "intro" ? " preparando" : "") +
            (fase === "final" ? " oculto" : "")
          }
        >
          <iframe
            ref={frameRef}
            className="demo-scratch-frame"
            src={EDITOR_PATH}
            allow="fullscreen"
            title="Editor de Scratch"
          />
        </div>
      )}

      {fase === "final" && (
        <DemoFinal xp={xp} xpTotal={XP_TOTAL_SCRATCH} onReiniciar={reiniciar} />
      )}
    </div>
  );
}
