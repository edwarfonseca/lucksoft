import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DialogContext, type DialogApi } from "@/components/dialog-context";

interface DialogState {
  kind: "aviso" | "confirmacion";
  mensaje: string;
  titulo: string;
  aceptar: string;
  cancelar: string;
  peligro: boolean;
  resolve: (ok: boolean) => void;
}

/**
 * Modales propios de la app (sustituyen a alert/confirm del navegador).
 * Un solo diálogo a la vez; abrir otro cancela el anterior.
 */
export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  const abrir = useCallback(
    (state: Omit<DialogState, "resolve">) =>
      new Promise<boolean>((resolve) => {
        setDialog((prev) => {
          prev?.resolve(false);
          return { ...state, resolve };
        });
      }),
    [],
  );

  const api = useMemo<DialogApi>(
    () => ({
      async avisar(mensaje, opts) {
        await abrir({
          kind: "aviso",
          mensaje,
          titulo: opts?.titulo ?? "Aviso",
          aceptar: opts?.aceptar ?? "Entendido",
          cancelar: "",
          peligro: false,
        });
      },
      confirmar(mensaje, opts) {
        return abrir({
          kind: "confirmacion",
          mensaje,
          titulo: opts?.titulo ?? "Confirmar",
          aceptar: opts?.aceptar ?? "Continuar",
          cancelar: opts?.cancelar ?? "Cancelar",
          peligro: opts?.peligro ?? false,
        });
      },
    }),
    [abrir],
  );

  function cerrar(ok: boolean) {
    dialog?.resolve(ok);
    setDialog(null);
  }

  // Cerrar con Escape (equivale a cancelar) y foco en el botón principal.
  useEffect(() => {
    if (!dialog) return;
    primaryRef.current?.focus();
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      dialog.resolve(false);
      setDialog(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog]);

  return (
    <DialogContext.Provider value={api}>
      {children}
      {dialog && (
        <div
          className="modal-overlay"
          onClick={() => cerrar(false)}
          role="presentation"
        >
          <div
            className="modal"
            role={dialog.kind === "aviso" ? "alertdialog" : "dialog"}
            aria-modal="true"
            aria-label={dialog.titulo}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2>{dialog.titulo}</h2>
              <button
                className="modal-close"
                aria-label="Cerrar"
                onClick={() => cerrar(false)}
              >
                ✕
              </button>
            </div>
            <p className="dialog-message">{dialog.mensaje}</p>
            <div className="dialog-actions">
              {dialog.kind === "confirmacion" && (
                <button className="btn btn-ghost" onClick={() => cerrar(false)}>
                  {dialog.cancelar}
                </button>
              )}
              <button
                ref={primaryRef}
                className={
                  "btn " + (dialog.peligro ? "btn-danger" : "btn-primary")
                }
                onClick={() => cerrar(true)}
              >
                {dialog.aceptar}
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}
