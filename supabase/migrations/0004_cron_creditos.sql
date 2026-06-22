-- LuckSoft — Fase 8 (paso 2): descuento AUTOMÁTICO de créditos cada semana.
--
-- Requiere la extensión pg_cron. Primero habilítala en el dashboard:
--   Supabase → Database → Extensions → busca "pg_cron" → Enable.
-- Luego pega este archivo en el SQL Editor y pulsa "Run".
--
-- Si prefieres no usar el cron, puedes omitir este archivo: el admin puede
-- ejecutar el descuento a mano desde el panel (botón "Descontar créditos de hoy").

create extension if not exists pg_cron with schema extensions;

-- Corre a diario a las 04:30 UTC ≈ 23:30 del día de clase en America/Bogota
-- (UTC-5). El día (dow) se calcula en zona Bogotá para que coincida con el día
-- real de la clase; consumir_creditos_dia solo afecta a los horarios de ese día,
-- así que cada estudiante pierde 1 crédito por semana.
select cron.schedule(
  'lucksoft-consumo-creditos-diario',
  '30 4 * * *',
  $cron$ select public.consumir_creditos_dia(extract(dow from (now() at time zone 'America/Bogota'))::int); $cron$
);

-- Para cambiar el horario del cron, vuelve a llamar cron.schedule con el mismo
-- nombre. Para quitarlo:  select cron.unschedule('lucksoft-consumo-creditos-diario');
