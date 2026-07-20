import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { usePythonRunner } from "@/features/courses/usePythonRunner";
import { animateTurtle } from "@/features/courses/turtleCanvas";
import {
  PASOS_DEMO,
  XP_TOTAL,
  type ResultadoEjecucion,
} from "@/features/demo/pasosDemo";

/**
 * Prueba gratis pública (/prueba): aventura guiada de 3 misiones sin registro.
 * Lucky, el guía, habla como en un videojuego; el código corre en el navegador
 * (Pyodide) y no toca ninguna base de datos. Al final, CTA a la clase gratis.
 */

/** Número de WhatsApp para agendar (con indicativo, solo dígitos, p. ej. "573001234567").
 *  Vacío = el botón lleva al formulario de contacto de la landing. */
const WHATSAPP_NUMERO = "";
const MENSAJE_WHATSAPP =
  "¡Hola! Completamos la prueba gratis de LuckSoft y queremos agendar la clase de prueba 🎉";
const URL_CONTACTO = WHATSAPP_NUMERO
  ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`
  : "https://lucksoftacademy.com/";

type EstadoGuia = "hola" | "habla" | "celebra" | "piensa";

/**
 * Animación HTML del guía por estado (mismo patrón que la mascota): archivos
 * autocontenidos en `public/characters/lucky/` incrustados en un iframe.
 * `null` = todavía no existe el archivo y se muestra el emoji de respaldo.
 */
const ANIMACIONES_GUIA: Record<EstadoGuia, string | null> = {
  hola: null, // p. ej. "/characters/lucky/hola.html"
  habla: null, // p. ej. "/characters/lucky/habla.html"
  celebra: null, // p. ej. "/characters/lucky/celebra.html"
  piensa: null, // p. ej. "/characters/lucky/piensa.html"
};

const EMOJI_GUIA: Record<EstadoGuia, string> = {
  hola: "🤖",
  habla: "🤖",
  celebra: "🥳",
  piensa: "🤔",
};

const INTRO_MENSAJES = [
  "¡Hola! Soy Lucky, tu guía en la academia 🤖 Hoy vas a convertirte en programador… de verdad.",
  "Tenemos 3 misiones cortitas. Si las completas todas, ganas 100 XP y el título de Programador Novato. ¿Aceptas el reto?",
];

const FINAL_MENSAJE =
  "¡MISIÓN CUMPLIDA! 🏅 100 XP y el título de Programador Novato. Corre a mostrarle a tu familia la estrella que programaste.";

/** Burbuja de diálogo con efecto máquina de escribir. */
function Burbuja({ texto }: { texto: string }) {
  const [visible, setVisible] = useState("");
  useEffect(() => {
    const rapido =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    const id = setInterval(
      () => {
        i = rapido ? texto.length : i + 1;
        setVisible(texto.slice(0, i));
        if (i >= texto.length) clearInterval(id);
      },
      rapido ? 0 : 16,
    );
    return () => clearInterval(id);
  }, [texto]);
  return <p className="demo-burbuja-texto">{visible}</p>;
}

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

  const anim = ANIMACIONES_GUIA[estadoGuia];

  return (
    <div className="demo-page">
      <header className="demo-top">
        <span className="demo-logo">
          <span className="logo">L</span> Luck<b>Soft</b>{" "}
          <span className="demo-logo-sub">· Prueba gratis</span>
        </span>
        <span className="demo-marcadores">
          {PASOS_DEMO.map((p, i) => (
            <span
              key={p.id}
              className={
                "demo-chip" +
                (logradas[i] ? " lograda" : fase === i ? " actual" : "")
              }
              title={p.titulo}
            >
              {logradas[i] ? "⭐" : i + 1}
            </span>
          ))}
          <span className="demo-xp">✨ {xp} XP</span>
        </span>
      </header>

      <section className="demo-guia" aria-live="polite">
        <div className={"guia-avatar " + estadoGuia} aria-hidden="true">
          {anim ? (
            <iframe
              src={anim}
              title="Lucky, el guía"
              className="guia-frame"
              scrolling="no"
            />
          ) : (
            <span className="guia-emoji">{EMOJI_GUIA[estadoGuia]}</span>
          )}
          <span className="guia-nombre">Lucky</span>
        </div>
        <div className="demo-burbuja">
          {cola.length > 0 && <Burbuja texto={cola[0]} />}
          <div className="demo-burbuja-acciones">
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
          </div>
        </div>
      </section>

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
        <section className="demo-final">
          <div className="demo-confetti" aria-hidden="true">
            {["🎉", "⭐", "🎊", "✨", "🏅", "🎈", "⭐", "🎉"].map((e, i) => (
              <span key={i} style={{ ["--i" as string]: i }}>
                {e}
              </span>
            ))}
          </div>
          <h1>🏅 ¡Programador Novato desbloqueado!</h1>
          <p className="demo-final-xp">
            ✨ {xp} de {XP_TOTAL} XP
          </p>
          <div className="demo-padres">
            <p>
              <strong>👨‍👩‍👧 Para papá y mamá:</strong> esto fue una probadita de la{" "}
              <strong>primera de 40 lecciones</strong> del curso real, con
              profesor en vivo, misiones, insignias y hasta una mascota virtual
              que crece con cada clase. La primera clase es gratis:
            </p>
            <div className="demo-cta">
              <a className="btn btn-primary demo-cta-btn" href={URL_CONTACTO}>
                🎁 Agendar la clase gratis
              </a>
              <a
                className="btn btn-ghost"
                href="https://lucksoftacademy.com/"
                target="_blank"
                rel="noreferrer"
              >
                Conocer los cursos
              </a>
              <button className="btn btn-ghost" onClick={reiniciar}>
                🔁 Jugar otra vez
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
