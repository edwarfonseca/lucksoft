-- LuckSoft — Fase 18: Mascota virtual (tamagotchi educativo).
-- El estudiante cuida UNA mascota global. Cada vez que avanza una lección, la
-- mascota pierde energía; si no la alimenta a tiempo, "muere" (energía 0). La
-- comida se compra en la tienda con monedas que se ganan según la calificación
-- de las actividades (monedas = nota / 10 por entrega calificada).
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- ─────────────────────────────────────────────────────────────
-- 1) Catálogo de comidas de la tienda (datos, no lógica). Cada comida tiene un
--    costo en monedas y la energía que devuelve. El servidor es la autoridad:
--    el cliente solo envía el id de la comida, nunca el precio ni la energía.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.mascota_comidas (
  id      text primary key,
  nombre  text not null,
  emoji   text not null,
  costo   int  not null check (costo >= 0),
  energia int  not null check (energia between 1 and 100),
  orden   int  not null default 0
);

alter table public.mascota_comidas enable row level security;

create policy "comidas: leer (autenticados)" on public.mascota_comidas
  for select to authenticated using (true);
create policy "comidas: admin gestiona" on public.mascota_comidas
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.mascota_comidas (id, nombre, emoji, costo, energia, orden) values
  ('manzana',  'Manzana',        '🍎', 3,  20,  1),
  ('sandwich', 'Sándwich',       '🥪', 6,  45,  2),
  ('pizza',    'Pizza',          '🍕', 10, 70,  3),
  ('pastel',   'Pastel mágico',  '🎂', 15, 100, 4)
on conflict (id) do update
  set nombre  = excluded.nombre,
      emoji   = excluded.emoji,
      costo   = excluded.costo,
      energia = excluded.energia,
      orden   = excluded.orden;

-- ─────────────────────────────────────────────────────────────
-- 2) Mascota: una fila por estudiante. La energía y las monedas se recalculan
--    en el servidor a partir del progreso (inscripciones) y las notas
--    (submissions), así que aquí solo guardamos el estado mutable mínimo:
--      energia          → energía actual (0..100).
--      lecciones_base   → total de lecciones que YA descontaron energía.
--      monedas_gastadas → total acumulado gastado en comida (monótono).
--    El saldo se deriva: saldo = ganado(notas) - monedas_gastadas.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.mascotas (
  estudiante_id    uuid primary key references public.profiles (id) on delete cascade,
  nombre           text not null default 'Pixel',
  energia          int  not null default 100 check (energia between 0 and 100),
  lecciones_base   int  not null default 0,
  monedas_gastadas int  not null default 0,
  updated_at       timestamptz not null default now()
);

alter table public.mascotas enable row level security;

create policy "mascota: leer propia" on public.mascotas
  for select to authenticated using (estudiante_id = auth.uid());
create policy "mascota: admin gestiona" on public.mascotas
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Energía que pierde la mascota por cada lección nueva avanzada. Con 34, tres
-- lecciones sin alimentar la llevan de 100 → 66 → 32 → 0 (muerta), tal como la
-- progresión "lección 1 bien, 2 con hambre, 3 pide comida, 4 muerta".
create or replace function public.mascota_drenaje()
returns int language sql immutable as $$ select 34 $$;

-- ─────────────────────────────────────────────────────────────
-- 3) Sincronización: asegura la fila de la mascota y descuenta la energía por
--    las lecciones avanzadas desde la última vez. SECURITY DEFINER: solo toca la
--    fila del propio usuario (auth.uid()).
-- ─────────────────────────────────────────────────────────────
create or replace function public.mascota_sync()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_progreso int;
  v_base     int;
  v_avance   int;
begin
  -- Crea la mascota la primera vez (energía llena).
  insert into public.mascotas (estudiante_id)
  values (auth.uid())
  on conflict (estudiante_id) do nothing;

  -- Total de lecciones alcanzadas sumando todas sus inscripciones.
  select coalesce(sum(progreso), 0) into v_progreso
    from public.inscripciones
   where estudiante_id = auth.uid();

  select lecciones_base into v_base
    from public.mascotas
   where estudiante_id = auth.uid();

  v_avance := v_progreso - v_base;
  if v_avance > 0 then
    update public.mascotas
       set energia        = greatest(0, energia - v_avance * public.mascota_drenaje()),
           lecciones_base = v_progreso,
           updated_at     = now()
     where estudiante_id = auth.uid();
  elsif v_progreso <> v_base then
    -- El progreso bajó (reinicio administrativo): re-sincroniza sin penalizar.
    update public.mascotas
       set lecciones_base = v_progreso, updated_at = now()
     where estudiante_id = auth.uid();
  end if;
end;
$$;

-- Monedas ganadas por las notas: nota / 10 por cada entrega calificada.
create or replace function public.mascota_monedas_ganadas()
returns int
language sql
security definer
set search_path = public
as $$
  select coalesce(sum(grade / 10), 0)::int
    from public.submissions
   where student_id = auth.uid() and grade is not null;
$$;

-- ─────────────────────────────────────────────────────────────
-- 4) Estado de la mascota (lo que consume la app). Sincroniza y devuelve
--    nombre, energía y saldo (monedas gastables).
-- ─────────────────────────────────────────────────────────────
create or replace function public.mascota_estado()
returns table (nombre text, energia int, saldo int)
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.mascota_sync();
  return query
    select m.nombre,
           m.energia,
           greatest(0, public.mascota_monedas_ganadas() - m.monedas_gastadas)
      from public.mascotas m
     where m.estudiante_id = auth.uid();
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- 5) Alimentar: valida saldo y comida en el servidor, sube energía (tope 100,
--    revive si estaba en 0) y registra el gasto. Devuelve el estado nuevo.
-- ─────────────────────────────────────────────────────────────
create or replace function public.mascota_alimentar(p_comida text)
returns table (nombre text, energia int, saldo int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_costo   int;
  v_energia int;
  v_saldo   int;
begin
  perform public.mascota_sync();

  select c.costo, c.energia into v_costo, v_energia
    from public.mascota_comidas c
   where c.id = p_comida;
  if v_costo is null then
    raise exception 'Comida desconocida: %', p_comida;
  end if;

  v_saldo := greatest(0, public.mascota_monedas_ganadas()
                          - (select monedas_gastadas from public.mascotas
                              where estudiante_id = auth.uid()));
  if v_saldo < v_costo then
    raise exception 'Monedas insuficientes';
  end if;

  update public.mascotas
     set energia          = least(100, energia + v_energia),
         monedas_gastadas = monedas_gastadas + v_costo,
         updated_at       = now()
   where estudiante_id = auth.uid();

  return query
    select m.nombre,
           m.energia,
           greatest(0, public.mascota_monedas_ganadas() - m.monedas_gastadas)
      from public.mascotas m
     where m.estudiante_id = auth.uid();
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- 6) Ponerle nombre a la mascota (opcional, para personalizarla).
-- ─────────────────────────────────────────────────────────────
create or replace function public.mascota_renombrar(p_nombre text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.mascota_sync();
  update public.mascotas
     set nombre = nullif(btrim(left(p_nombre, 24)), ''),
         updated_at = now()
   where estudiante_id = auth.uid();
  -- Si quedó vacío, restablece el nombre por defecto.
  update public.mascotas
     set nombre = 'Pixel'
   where estudiante_id = auth.uid() and nombre is null;
end;
$$;

grant execute on function public.mascota_estado() to authenticated;
grant execute on function public.mascota_alimentar(text) to authenticated;
grant execute on function public.mascota_renombrar(text) to authenticated;
