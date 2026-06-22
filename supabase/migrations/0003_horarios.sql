-- LuckSoft — Fase 8: horarios de clase + consumo automático de créditos.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".
--
-- Modelo: un "horario" es una clase semanal recurrente de 1 hora (un curso, un
-- día de la semana y una hora). Cada estudiante pertenece a un único horario
-- (profiles.horario_id). Cada semana, el día de la clase, se descuenta 1 crédito
-- a cada estudiante activo del horario (consumo automático vía pg_cron).

-- ─────────────────────────────────────────────────────────────
-- 1) Tabla de horarios
-- ─────────────────────────────────────────────────────────────
create table if not exists public.horarios (
  id          uuid primary key default gen_random_uuid(),
  curso       text not null check (curso in ('python', 'web', 'scratch')),
  -- Día de la semana según convención de Postgres EXTRACT(DOW): 0=Domingo … 6=Sábado.
  dia_semana  smallint not null check (dia_semana between 0 and 6),
  hora_inicio time not null,
  docente_id  uuid references public.profiles (id) on delete set null,
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.horarios enable row level security;

-- Cualquier usuario autenticado puede leer los horarios (para ver su clase).
create policy "todos: leer horarios" on public.horarios
  for select to authenticated using (true);

-- Solo el admin crea/edita/borra horarios.
create policy "admin: gestionar horarios" on public.horarios
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 2) El estudiante pertenece a un horario
-- ─────────────────────────────────────────────────────────────
alter table public.profiles
  add column if not exists horario_id uuid references public.horarios (id) on delete set null;

-- ─────────────────────────────────────────────────────────────
-- 3) Consumo de créditos: descuenta 1 crédito a los estudiantes activos cuyos
--    horarios se dictan en el día indicado (dow 0-6). Devuelve cuántos afectó.
--    SECURITY DEFINER + sin permiso público: solo la llaman el cron y el wrapper
--    de admin de abajo.
-- ─────────────────────────────────────────────────────────────
create or replace function public.consumir_creditos_dia(p_dia int)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  afectados int;
begin
  update public.profiles p
     set creditos_pagados = p.creditos_pagados - 1
    from public.horarios h
   where p.horario_id = h.id
     and p.role::text = 'estudiante'
     and p.activo = true
     and h.activo = true
     and h.dia_semana = p_dia
     and p.creditos_pagados > 0;
  get diagnostics afectados = row_count;
  return afectados;
end;
$$;

revoke execute on function public.consumir_creditos_dia(int) from public, anon, authenticated;

-- Wrapper que el admin puede invocar a mano desde la app (RPC). Útil para probar
-- el descuento sin esperar al cron, y como respaldo si pg_cron no está activo.
create or replace function public.admin_consumir_creditos_hoy()
returns int
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Requiere rol admin';
  end if;
  -- Día actual en horario de Colombia (ajusta la zona si lo necesitas).
  return public.consumir_creditos_dia(
    extract(dow from (now() at time zone 'America/Bogota'))::int
  );
end;
$$;

grant execute on function public.admin_consumir_creditos_hoy() to authenticated;

-- El descuento automático semanal (cron) se programa aparte, en
-- 0004_cron_creditos.sql, porque requiere la extensión pg_cron habilitada.