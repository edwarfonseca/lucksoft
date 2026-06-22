-- LuckSoft — Fase 8b: numeración de grupos por curso.
-- Cada horario recibe un número de grupo correlativo dentro de su curso, para
-- nombrarlo Python1, Web1, Scratch1, Python2, … Pega TODO este archivo en el
-- SQL Editor de Supabase y pulsa "Run".

-- 1) Columna del número de grupo.
alter table public.horarios
  add column if not exists grupo int;

-- 2) Rellenar los horarios existentes: numeración por curso según antigüedad.
with ranked as (
  select id,
         row_number() over (partition by curso order by created_at, id) as rn
  from public.horarios
  where grupo is null
)
update public.horarios h
   set grupo = r.rn
  from ranked r
 where h.id = r.id;

-- 3) A partir de ahora, grupo es obligatorio (lo asigna el trigger de abajo).
alter table public.horarios
  alter column grupo set not null;

-- 4) Trigger: al insertar un horario sin grupo, asigna el siguiente del curso.
--    Usa max(grupo)+1 para no reutilizar números aunque se borren grupos.
create or replace function public.set_horario_grupo()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.grupo is null then
    select coalesce(max(grupo), 0) + 1
      into new.grupo
      from public.horarios
     where curso = new.curso;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_set_horario_grupo on public.horarios;
create trigger trg_set_horario_grupo
  before insert on public.horarios
  for each row execute function public.set_horario_grupo();
