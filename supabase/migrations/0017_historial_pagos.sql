-- LuckSoft — Historial de pagos: cada vez que suben los créditos de un
-- estudiante (el acudiente pagó), un trigger lo registra automáticamente en la
-- tabla `pagos`. Descuentos (cron semanal, descuento manual) NO se registran:
-- son consumo, no pagos. El nombre del estudiante se guarda como copia
-- (snapshot) para que el historial sobreviva si la cuenta se elimina.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- 1) Tabla del historial.
create table if not exists public.pagos (
  id                bigint generated always as identity primary key,
  -- Referencia viva al estudiante; si se borra la cuenta queda null pero el
  -- registro (con el nombre copiado) se conserva.
  estudiante_id     uuid references public.profiles(id) on delete set null,
  estudiante_nombre text not null,
  -- Créditos agregados en este pago (siempre positivo).
  creditos          int  not null check (creditos > 0),
  -- Saldo de créditos del estudiante después del pago.
  saldo_despues     int  not null,
  -- Admin que registró el pago (null si vino del servidor, p. ej. al crear la
  -- cuenta desde la Edge Function).
  registrado_por    uuid references public.profiles(id) on delete set null,
  created_at        timestamptz not null default now()
);

-- Solo se lee vía la RPC de admin (security definer); sin políticas directas.
alter table public.pagos enable row level security;

-- 2) Trigger: registra el aumento de créditos como pago.
create or replace function public.registrar_pago()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    -- Cuenta creada ya con créditos: es el primer pago.
    if new.creditos_pagados > 0 then
      insert into public.pagos
        (estudiante_id, estudiante_nombre, creditos, saldo_despues, registrado_por)
      values
        (new.id, coalesce(new.full_name, ''), new.creditos_pagados,
         new.creditos_pagados, auth.uid());
    end if;
  elsif new.creditos_pagados > old.creditos_pagados then
    insert into public.pagos
      (estudiante_id, estudiante_nombre, creditos, saldo_despues, registrado_por)
    values
      (new.id, coalesce(new.full_name, ''),
       new.creditos_pagados - old.creditos_pagados,
       new.creditos_pagados, auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists trg_registrar_pago on public.profiles;
create trigger trg_registrar_pago
after insert or update of creditos_pagados on public.profiles
for each row execute function public.registrar_pago();

-- 3) RPC para el panel de admin (patrón del proyecto: SECURITY DEFINER +
--    is_admin(); cruza datos de varios usuarios).
create or replace function public.admin_historial_pagos()
returns table (
  id             bigint,
  fecha          timestamptz,
  estudiante_id  uuid,
  estudiante     text,
  creditos       int,
  saldo_despues  int,
  registrado_por text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'No autorizado';
  end if;

  return query
  select pg.id,
         pg.created_at                                   as fecha,
         pg.estudiante_id,
         -- Nombre actual si la cuenta existe; si no, el snapshot del pago.
         coalesce(nullif(e.full_name, ''), pg.estudiante_nombre) as estudiante,
         pg.creditos,
         pg.saldo_despues,
         coalesce(a.full_name, 'Sistema')                as registrado_por
    from public.pagos pg
    left join public.profiles e on e.id = pg.estudiante_id
    left join public.profiles a on a.id = pg.registrado_por
   order by pg.created_at desc;
end;
$$;

grant execute on function public.admin_historial_pagos() to authenticated;
