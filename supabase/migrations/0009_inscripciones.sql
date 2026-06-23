-- LuckSoft — Fase 11: inscripciones (un estudiante en varios grupos) + progreso
-- por curso + lecciones que se desbloquean por avance.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- ─────────────────────────────────────────────────────────────
-- 1) Inscripciones: relación muchos-a-muchos estudiante ↔ grupo, con su progreso.
--    progreso = índice de la última lección alcanzada (0 = ninguna; 1..40).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.inscripciones (
  id            uuid primary key default gen_random_uuid(),
  estudiante_id uuid not null references public.profiles (id) on delete cascade,
  horario_id    uuid not null references public.horarios (id) on delete cascade,
  progreso      int  not null default 0,
  created_at    timestamptz not null default now(),
  unique (estudiante_id, horario_id)
);

alter table public.inscripciones enable row level security;

create policy "insc: leer propio" on public.inscripciones
  for select to authenticated using (estudiante_id = auth.uid());
create policy "insc: admin gestiona" on public.inscripciones
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 2) Backfill: cada profiles.horario_id existente se vuelve una inscripción,
--    conservando su progreso (de ultimo_periodo/ultima_sesion a índice 1..40).
-- ─────────────────────────────────────────────────────────────
insert into public.inscripciones (estudiante_id, horario_id, progreso)
select p.id,
       p.horario_id,
       (coalesce(p.ultimo_periodo, 1) - 1) * 4 + coalesce(p.ultima_sesion, 1)
  from public.profiles p
 where p.horario_id is not null
on conflict (estudiante_id, horario_id) do nothing;

-- ─────────────────────────────────────────────────────────────
-- 3) Progreso por inscripción: solo avanza a la SIGUIENTE lección (no salta).
--    El bloqueo por horario de clase lo aplica la UI; aquí limitamos el salto.
-- ─────────────────────────────────────────────────────────────
drop function if exists public.set_progreso(int, int);

create or replace function public.set_progreso(p_horario_id uuid, p_idx int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  cur int;
begin
  select progreso into cur
    from public.inscripciones
   where estudiante_id = auth.uid() and horario_id = p_horario_id;
  if cur is null then
    return; -- no es su inscripción
  end if;
  if p_idx <= cur then
    return; -- relectura de una lección ya vista
  end if;
  if p_idx = cur + 1 then -- solo se avanza una lección
    update public.inscripciones
       set progreso = p_idx
     where estudiante_id = auth.uid() and horario_id = p_horario_id;
  end if;
end;
$$;

grant execute on function public.set_progreso(uuid, int) to authenticated;

-- ─────────────────────────────────────────────────────────────
-- 4) Consumo de créditos: 1 por cada clase (grupo) que el estudiante tiene ese
--    día, descontado de su bolsa compartida (sin bajar de 0).
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
  with cargos as (
    select i.estudiante_id, count(*)::int as n
      from public.inscripciones i
      join public.horarios h on h.id = i.horario_id
      join public.profiles p on p.id = i.estudiante_id
     where h.activo and p.activo and p.role::text = 'estudiante'
       and h.dia_semana = p_dia
     group by i.estudiante_id
  )
  update public.profiles p
     set creditos_pagados = greatest(0, p.creditos_pagados - c.n)
    from cargos c
   where p.id = c.estudiante_id and p.creditos_pagados > 0;
  get diagnostics afectados = row_count;
  return afectados;
end;
$$;
