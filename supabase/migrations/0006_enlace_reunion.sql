-- LuckSoft — Fase 8c: enlace de la clase remota por grupo.
-- Cada horario puede tener un enlace de reunión (Zoom/Meet/Teams/Jitsi). Si se
-- deja vacío, la app genera una sala Jitsi por grupo automáticamente. Pega TODO
-- este archivo en el SQL Editor de Supabase y pulsa "Run".

alter table public.horarios
  add column if not exists enlace_reunion text;
