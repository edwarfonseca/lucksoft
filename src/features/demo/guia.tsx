import { useEffect, useState, type ReactNode } from "react";
import { URL_CONTACTO } from "@/features/demo/contacto";

/**
 * Piezas compartidas de las pruebas gratis públicas (/prueba-python y /prueba-scratch):
 * Lucky el guía (avatar + burbuja de diálogo), el encabezado con XP/misiones y
 * la pantalla final con el llamado a la clase gratis.
 */

export type EstadoGuia = "hola" | "habla" | "celebra" | "piensa";

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

/** Burbuja de diálogo con efecto máquina de escribir. */
export function Burbuja({ texto }: { texto: string }) {
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

/** Lucky (avatar animado) + su burbuja con el diálogo y los botones de acción. */
export function GuiaLucky({
  estado,
  mensaje,
  acciones,
}: {
  estado: EstadoGuia;
  mensaje: string | null;
  acciones: ReactNode;
}) {
  const anim = ANIMACIONES_GUIA[estado];
  return (
    <section className="demo-guia" aria-live="polite">
      <div className={"guia-avatar " + estado} aria-hidden="true">
        {anim ? (
          <iframe
            src={anim}
            title="Lucky, el guía"
            className="guia-frame"
            scrolling="no"
          />
        ) : (
          <span className="guia-emoji">{EMOJI_GUIA[estado]}</span>
        )}
        <span className="guia-nombre">Lucky</span>
      </div>
      <div className="demo-burbuja">
        {mensaje !== null && <Burbuja texto={mensaje} />}
        <div className="demo-burbuja-acciones">{acciones}</div>
      </div>
    </section>
  );
}

/** Encabezado de la prueba: logo, chips de misión y XP. */
export function DemoHeader({
  titulos,
  logradas,
  actual,
  xp,
}: {
  titulos: string[];
  logradas: boolean[];
  actual: number | null;
  xp: number;
}) {
  return (
    <header className="demo-top">
      <span className="demo-logo">
        <span className="logo">L</span> Luck<b>Soft</b>{" "}
        <span className="demo-logo-sub">· Prueba gratis</span>
      </span>
      <span className="demo-marcadores">
        {titulos.map((t, i) => (
          <span
            key={t}
            className={
              "demo-chip" +
              (logradas[i] ? " lograda" : actual === i ? " actual" : "")
            }
            title={t}
          >
            {logradas[i] ? "⭐" : i + 1}
          </span>
        ))}
        <span className="demo-xp">✨ {xp} XP</span>
      </span>
    </header>
  );
}

/** Pantalla final compartida: título ganado, XP y llamado a la clase gratis. */
export function DemoFinal({
  xp,
  xpTotal,
  onReiniciar,
}: {
  xp: number;
  xpTotal: number;
  onReiniciar: () => void;
}) {
  return (
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
        ✨ {xp} de {xpTotal} XP
      </p>
      <div className="demo-padres">
        <p>
          <strong>👨‍👩‍👧 Para papá y mamá:</strong> esto fue una probadita de la{" "}
          <strong>primera de 40 lecciones</strong> del curso real, con profesor
          en vivo, misiones, insignias y hasta una mascota virtual que crece con
          cada clase. La primera clase es gratis:
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
          <button className="btn btn-ghost" onClick={onReiniciar}>
            🔁 Jugar otra vez
          </button>
        </div>
      </div>
    </section>
  );
}
