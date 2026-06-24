import { useCallback, useEffect, useRef, useState } from "react";
import type { TurtleData } from "@/features/courses/turtleCanvas";

export interface OutputSegment {
  text: string;
  error: boolean;
}

/** Hay aislamiento de origen + SharedArrayBuffer (necesario para input()). */
const canUseWorker =
  typeof SharedArrayBuffer !== "undefined" && self.crossOriginIsolated === true;

/**
 * Ejecuta Python (Pyodide) en un Web Worker. input() se lee de forma bloqueante
 * vía SharedArrayBuffer + Atomics sin congelar la UI. Encapsula toda la
 * mensajería con el worker (migra editor.js modo worker).
 */
export function usePythonRunner() {
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState(
    canUseWorker ? "Cargando Python…" : "Aislamiento de origen no disponible",
  );
  const [output, setOutput] = useState<OutputSegment[]>([]);
  const [awaitingInput, setAwaitingInput] = useState(false);
  const [turtleData, setTurtleData] = useState<TurtleData | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const controlRef = useRef<Int32Array | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);

  const append = useCallback((text: string, error: boolean) => {
    setOutput((prev) => [...prev, { text, error }]);
  }, []);

  const createWorker = useCallback(() => {
    const controlSAB = new SharedArrayBuffer(8);
    const dataSAB = new SharedArrayBuffer(1024 * 8);
    controlRef.current = new Int32Array(controlSAB);
    dataRef.current = new Uint8Array(dataSAB);

    const worker = new Worker("/pyworker.js");
    workerRef.current = worker;
    worker.postMessage({ type: "init", controlSAB, dataSAB });

    worker.onerror = (e) =>
      append("✗ Error en el worker: " + (e.message || "") + "\n", true);

    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data;
      switch (msg.type) {
        case "ready":
          setStatus("Python listo ✓");
          setReady(true);
          setRunning(false);
          break;
        case "stdout":
          append(msg.text, false);
          break;
        case "stderr":
          append(msg.text, true);
          break;
        case "input_request":
          setAwaitingInput(true);
          break;
        case "turtle":
          setTurtleData(msg.data);
          break;
        case "done":
          setStatus("Listo ✓");
          setRunning(false);
          break;
        case "error":
          append(msg.text, true);
          setStatus("Terminó con errores");
          setRunning(false);
          break;
        case "init_error":
          setStatus("Error al cargar Python");
          append("✗ No se pudo iniciar Python:\n" + msg.text + "\n", true);
          break;
      }
    };
  }, [append]);

  // Crear el worker al montar; terminarlo al desmontar.
  useEffect(() => {
    if (canUseWorker) createWorker();
    return () => workerRef.current?.terminate();
  }, [createWorker]);

  const run = useCallback((code: string) => {
    setOutput([]);
    setTurtleData(null);
    setRunning(true);
    setStatus("Ejecutando…");
    workerRef.current?.postMessage({ type: "run", code });
  }, []);

  const stop = useCallback(() => {
    workerRef.current?.terminate();
    append("\n⏹ Ejecución detenida.\n", true);
    setStatus("Reiniciando Python…");
    setReady(false);
    setRunning(false);
    setAwaitingInput(false);
    createWorker(); // recrear para la próxima ejecución
  }, [append, createWorker]);

  const clear = useCallback(() => {
    setOutput([]);
    setTurtleData(null);
  }, []);

  const submitInput = useCallback(
    (value: string) => {
      const control = controlRef.current;
      const data = dataRef.current;
      if (!control || !data) return;
      const bytes = new TextEncoder().encode(value);
      const len = Math.min(bytes.length, data.length);
      data.set(bytes.subarray(0, len));
      Atomics.store(control, 1, len);
      Atomics.store(control, 0, 1);
      Atomics.notify(control, 0, 1);
      append(value + "\n", false); // eco, como en una terminal
      setAwaitingInput(false);
    },
    [append],
  );

  return {
    ready,
    running,
    status,
    output,
    awaitingInput,
    turtleData,
    canUseWorker,
    run,
    stop,
    clear,
    submitInput,
  };
}
