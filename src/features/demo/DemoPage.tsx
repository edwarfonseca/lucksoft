import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { usePythonRunner } from "@/features/courses/usePythonRunner";
import { animateTurtle } from "@/features/courses/turtleCanvas";
import {
  DemoFinal,
  DemoHeader,
  GuiaLucky,
  type EstadoGuia,
} from "@/features/demo/guia";
import {
  PASOS_DEMO,
  XP_TOTAL,
  type ResultadoEjecucion,
} from "@/features/demo/pasosDemo";

/**
 * Prueba gratis pública de Python (/prueba-python): aventura guiada de 3 misiones sin
 * registro. Lucky habla como en un videojuego; el código corre en el navegador
 * (Pyodide) y no toca ninguna base de datos. Al final, CTA a la clase gratis.
 */

const INTRO_MENSAJES = [
  "¡Hola! Soy Lucky, tu guía en la academia 🤖 Hoy vas a convertirte en programador… de verdad.",
  "Tenemos 3 misiones cortitas. Si las completas todas, ganas 100 XP y el título de Programador Novato. ¿Aceptas el reto?",
];

const FINAL_MENSAJE =
  "¡MISIÓN CUMPLIDA! 🏅 100 XP y el título de Programador Novato. Corre a mostrarle a tu familia la estrella que programaste.";

export function DemoPage() {
  const runner = usePythonRunner();

  // Fase: intro → misiones (0..n) → final.
  const [fase, setFase] = useState<"intro" | "final" | number>("intro");
  const [xp, setXp] = useState(0);
  const [logradas, setLogradas] = useState<boolean[]>(
    PASOS_DEMO.map(() => false),
  );
  const [code, setCode] = useState("");
  const [cola, setCola] = useState<string[]>(INTRO_MENSAJES);
  const [estadoGuia, setEstadoGuia] = useState<EstadoGuia>("hola");
  const [pasoLogrado, setPasoLogrado] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const ultimoCodigo = useRef("");
  const ejecucion = useRef(0); // nº de ejecuciones lanzadas
  const evaluada = useRef(0); // última ejecución ya evaluada

  const paso = typeof fase === "number" ? PASOS_DEMO[fase] : null;

  // Dibuja la tortuga cuando llega un resultado.
  useEffect(() => {
    if (!runner.turtleData || !canvasRef.current) return;
    return animateTurtle(canvasRef.current, runner.turtleData);
  }, [runner.turtleData]);

  // Autoscroll de la consola.
  useEffect(() => {
    if (consoleRef.current)
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [runner.output]);

  // Al terminar una ejecución, Lucky evalúa la misión (con una pausa dramática).
  useEffect(() => {
    if (runner.running || !paso || pasoLogrado) return;
    if (ejecucion.current === 0 || evaluada.current === ejecucion.current)
      return;
    evaluada.current = ejecucion.current;
    const idx = fase as number;
    const r: ResultadoEjecucion = {
      salida: runner.output.map((s) => s.text).join(""),
      error: runner.output.some((s) => s.error),
      turtle: !!runner.turtleData,
      codigo: ultimoCodigo.current,
    };
    setTimeout(() => {
      if (paso.exito(r)) {
        setXp((x) => x + paso.xp);
        setLogradas((ls) => ls.map((v, i) => (i === idx ? true : v)));
        setPasoLogrado(true);
        setEstadoGuia("celebra");
        setCola([paso.festejo]);
      } else {
        setEstadoGuia("piensa");
        setCola([r.error ? paso.pistaError : paso.pista]);
      }
    }, 800);
  }, [
    runner.running,
    runner.output,
    runner.turtleData,
    paso,
    pasoLogrado,
    fase,
  ]);

  function empezarPaso(i: number) {
    setFase(i);
    setCode(PASOS_DEMO[i].codigo);
    setCola(PASOS_DEMO[i].mensajes);
    setEstadoGuia("habla");
    setPasoLogrado(false);
    runner.clear();
  }

  function ejecutar() {
    if (!runner.ready || runner.running) return;
    ejecucion.current++;
    ultimoCodigo.current = code;
    setEstadoGuia("habla");
    runner.run(code);
  }

  function siguiente() {
    const idx = fase as number;
    if (idx + 1 < PASOS_DEMO.length) {
      empezarPaso(idx + 1);
    } else {
      setFase("final");
      setCola([FINAL_MENSAJE]);
      setEstadoGuia("celebra");
    }
  }

  function reiniciar() {
    setXp(0);
    setLogradas(PASOS_DEMO.map(() => false));
    empezarPaso(0);
  }

  return (
    <div className="demo-page">
      <DemoHeader
        titulos={PASOS_DEMO.map((p) => p.titulo)}
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
            {pasoLogrado && typeof fase === "number" && (
              <button className="btn btn-primary" onClick={siguiente}>
                {fase + 1 < PASOS_DEMO.length
                  ? "Siguiente misión ➜"
                  : "🏁 Terminar la aventura"}
              </button>
            )}
          </>
        }
      />

      {fase === "intro" && (
        <p className="demo-switch">
          🐱 ¿Tienes entre 7 y 9 años? Prueba mejor la{" "}
          <Link to="/prueba-scratch">aventura de Scratch</Link> (¡con bloques de
          colores!).
        </p>
      )}

      {paso && (
        <section className="demo-reto">
          <h1 className="demo-titulo">{paso.titulo}</h1>
          <p className="demo-instruccion">🎯 {paso.instruccion}</p>

          <div className="demo-editor">
            <CodeMirror
              value={code}
              theme="dark"
              height="220px"
              extensions={[python()]}
              onChange={setCode}
            />
          </div>

          <div className="demo-run-row">
            <button
              className="btn btn-primary demo-run"
              disabled={!runner.ready || runner.running}
              onClick={ejecutar}
            >
              ▶ Ejecutar
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setCode(paso.codigo)}
            >
              ↺ Restaurar código
            </button>
            {!runner.ready && runner.canUseWorker && (
              <span className="demo-status">
                🪄 Preparando la magia… (unos segundos)
              </span>
            )}
            {runner.running && <span className="demo-status">Ejecutando…</span>}
          </div>

          {!runner.canUseWorker && (
            <p className="notice">
              Este navegador no soporta el laboratorio de Python. Prueba con
              Chrome, Edge o Firefox actualizados.
            </p>
          )}

          <div className="demo-salida">
            {runner.turtleData && (
              <div className="demo-canvas-wrap">
                <canvas
                  ref={canvasRef}
                  className="demo-canvas"
                  aria-label="Dibujo de la tortuga"
                />
              </div>
            )}
            <div className="demo-console" ref={consoleRef}>
              {runner.output.length === 0 && !runner.turtleData ? (
                <span className="demo-console-hint">
                  Aquí aparecerá lo que haga tu código…
                </span>
              ) : (
                runner.output.map((seg, i) => (
                  <span key={i} className={seg.error ? "err" : undefined}>
                    {seg.text}
                  </span>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {fase === "final" && (
        <DemoFinal xp={xp} xpTotal={XP_TOTAL} onReiniciar={reiniciar} />
      )}
    </div>
  );
}
