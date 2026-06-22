import { useEffect, useState } from "react";

/**
 * Devuelve la hora actual y la refresca cada `ms` para reevaluar la UI que
 * depende del tiempo (p. ej. habilitar el botón de la clase remota al llegar la
 * hora sin que el usuario recargue).
 */
export function useNowTick(ms = 30000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
