# infrastructure — Adaptadores

Implementaciones concretas de los _ports_ del dominio:

- `local/` — adaptador sobre `localStorage` (reusa la lógica actual de
  `LuckSoft/js/db.js`); útil offline y para tests.
- `supabase/` — adaptador sobre Supabase (Auth + Postgres + Storage).

Intercambiar uno por otro no debe afectar al dominio ni a la UI. `local/` se
crea en la **Fase 2**; `supabase/` en la **Fase 5** (ver `LuckSoft/PLAN.md`).