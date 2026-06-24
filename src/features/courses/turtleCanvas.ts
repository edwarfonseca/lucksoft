// Reproduce en un <canvas> los trazos que envía el módulo turtle, animando el
// avance (como si la tortuga fuera dibujando). Las coordenadas ya vienen en el
// sistema del canvas (origen arriba-izquierda).

interface LineCmd {
  t: "l";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  c: string;
  w: number;
  s: number;
}
interface FillCmd {
  t: "f";
  pts: [number, number][];
  c: string;
}
interface DotCmd {
  t: "d";
  x: number;
  y: number;
  r: number;
  c: string;
}
interface TextCmd {
  t: "x";
  x: number;
  y: number;
  s: string;
  sz: number;
  c: string;
  a: string;
}
type Cmd = LineCmd | FillCmd | DotCmd | TextCmd;

export interface TurtleData {
  w: number;
  h: number;
  bg: string;
  cmds: Cmd[];
  turtles: { pts: [number, number][]; fill: string; stroke: string }[];
}

const ANCHOR: Record<string, CanvasTextAlign> = {
  start: "left",
  middle: "center",
  end: "right",
};

/** Píxeles por frame según la velocidad de turtle (0 = instantáneo). */
const pxPorFrame = (s: number) => (s <= 0 ? Infinity : 1 + s * 2);

/**
 * Anima los comandos sobre el canvas. Devuelve una función para cancelar
 * (necesaria al re-ejecutar o desmontar).
 */
export function animateTurtle(
  canvas: HTMLCanvasElement,
  data: TurtleData,
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const cmds = data.cmds;

  // Escalar el lienzo para llenar el panel (manteniendo proporción) y nítido en
  // pantallas de alta densidad. Las funciones de dibujo usan coords lógicas.
  const dpr = window.devicePixelRatio || 1;
  const host = canvas.parentElement;
  let scale = 1;
  if (host) {
    const availW = Math.max(80, host.clientWidth - 20);
    const availH = Math.max(80, host.clientHeight - 20);
    scale = Math.min(availW / data.w, availH / data.h);
    if (!isFinite(scale) || scale <= 0) scale = 1;
    scale = Math.min(scale, 3);
  }
  canvas.style.width = data.w * scale + "px";
  canvas.style.height = data.h * scale + "px";
  canvas.width = Math.round(data.w * scale * dpr);
  canvas.height = Math.round(data.h * scale * dpr);
  ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);

  const clearBg = () => {
    ctx.fillStyle = data.bg || "white";
    ctx.fillRect(0, 0, data.w, data.h);
  };
  const fill = (c: FillCmd) => {
    ctx.beginPath();
    c.pts.forEach((p, j) =>
      j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]),
    );
    ctx.closePath();
    ctx.fillStyle = c.c;
    ctx.fill();
  };
  const strokeLine = (c: LineCmd, frac: number) => {
    ctx.beginPath();
    ctx.moveTo(c.x1, c.y1);
    ctx.lineTo(c.x1 + (c.x2 - c.x1) * frac, c.y1 + (c.y2 - c.y1) * frac);
    ctx.strokeStyle = c.c;
    ctx.lineWidth = c.w;
    ctx.lineCap = "round";
    ctx.stroke();
  };
  const dot = (c: DotCmd) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.c;
    ctx.fill();
  };
  const text = (c: TextCmd) => {
    ctx.fillStyle = c.c;
    ctx.font = `${c.sz}px Arial`;
    ctx.textAlign = ANCHOR[c.a] ?? "left";
    ctx.fillText(c.s, c.x, c.y);
  };
  const figura = (tf: TurtleData["turtles"][number]) => {
    ctx.beginPath();
    tf.pts.forEach((p, j) =>
      j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]),
    );
    ctx.closePath();
    ctx.fillStyle = tf.fill;
    ctx.fill();
    ctx.strokeStyle = tf.stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  const marker = (x: number, y: number, ang: number, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-6, -5);
    ctx.lineTo(-6, 5);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };

  // Dibuja todo lo completado hasta `upto`; rellenos van primero (debajo).
  const render = (upto: number) => {
    clearBg();
    for (let i = 0; i < upto; i++)
      if (cmds[i].t === "f") fill(cmds[i] as FillCmd);
    for (let i = 0; i < upto; i++) {
      const c = cmds[i];
      if (c.t === "l") strokeLine(c, 1);
      else if (c.t === "d") dot(c);
      else if (c.t === "x") text(c);
    }
  };
  const renderFinal = () => {
    render(cmds.length);
    data.turtles.forEach(figura);
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lineas = cmds.filter((c) => c.t === "l").length;
  if (reduce || lineas === 0 || lineas > 1500) {
    renderFinal();
    return () => {};
  }

  let idx = 0;
  let drawnPx = 0;
  let raf = 0;
  let cancelled = false;

  const frame = () => {
    if (cancelled) return;
    // Saltar comandos instantáneos (relleno/punto/texto): ya se dibujan en render.
    while (idx < cmds.length && cmds[idx].t !== "l") idx++;
    let frac = 1;
    if (idx < cmds.length) {
      const c = cmds[idx] as LineCmd;
      const L = Math.hypot(c.x2 - c.x1, c.y2 - c.y1) || 0.0001;
      drawnPx += pxPorFrame(c.s);
      if (drawnPx >= L) {
        idx++;
        drawnPx = 0;
      } else {
        frac = drawnPx / L;
      }
    }
    render(idx);
    if (idx < cmds.length) {
      const c = cmds[idx] as LineCmd;
      strokeLine(c, frac);
      const tx = c.x1 + (c.x2 - c.x1) * frac;
      const ty = c.y1 + (c.y2 - c.y1) * frac;
      marker(tx, ty, Math.atan2(c.y2 - c.y1, c.x2 - c.x1), c.c);
      raf = requestAnimationFrame(frame);
    } else {
      renderFinal();
    }
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}
