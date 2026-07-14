import { createContext, useContext } from "react";

/** Opciones del modal informativo (sustituto de alert). */
export interface AvisoOptions {
  titulo?: string;
  /** Texto del botón de cierre (por defecto "Entendido"). */
  aceptar?: string;
}

/** Opciones del modal de confirmación (sustituto de confirm). */
export interface ConfirmacionOptions extends AvisoOptions {
  /** Texto del botón de cancelar (por defecto "Cancelar"). */
  cancelar?: string;
  /** Pinta el botón principal en rojo (acciones destructivas). */
  peligro?: boolean;
}

/** API de modales propios que sustituyen a alert/confirm del navegador. */
export interface DialogApi {
  /** Modal informativo. La promesa se resuelve al cerrarlo. */
  avisar(mensaje: string, opts?: AvisoOptions): Promise<void>;
  /** Modal de confirmación. Resuelve true solo si el usuario acepta. */
  confirmar(mensaje: string, opts?: ConfirmacionOptions): Promise<boolean>;
}

export const DialogContext = createContext<DialogApi | null>(null);

/** Hook para abrir modales propios. Falla fuera de <DialogProvider>. */
export function useDialog(): DialogApi {
  const ctx = useContext(DialogContext);
  if (!ctx)
    throw new Error("useDialog debe usarse dentro de <DialogProvider>.");
  return ctx;
}
