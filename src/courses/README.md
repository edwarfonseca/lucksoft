# courses — Estrategias de curso (patrón Strategy)

Cada curso (`python/`, `web/`, `scratch/`) implementa una interfaz común
`CourseStrategy` con su forma de editar, entregar y revisar. Un `registry.ts`
resuelve la estrategia por `kind`.

Esto elimina los `if (kind === …)` dispersos del código legacy: añadir un curso
nuevo = añadir una estrategia, sin tocar el resto. Se llena en la **Fase 3**
(ver `LuckSoft/PLAN.md`).