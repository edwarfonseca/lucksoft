-- LuckSoft — Fase 10: progreso de lecciones del estudiante.
-- Cada curso se divide en 10 periodos (meses) × 4 sesiones (semanas) = 40
-- lecciones. Guardamos la última lección del estudiante para retomarla.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

alter table public.profiles
  add column if not exists ultimo_periodo int not null default 1,
  add column if not exists ultima_sesion  int not null default 1;

-- El estudiante registra su propia lección actual. Es SECURITY DEFINER y solo
-- toca esas dos columnas de su propia fila, así que no necesita una política de
-- update sobre profiles (que le dejaría tocar créditos/rol).
create or replace function public.set_progreso(p_periodo int, p_sesion int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
     set ultimo_periodo = greatest(1, least(10, p_periodo)),
         ultima_sesion  = greatest(1, least(4, p_sesion))
   where id = auth.uid();
end;
$$;

grant execute on function public.set_progreso(int, int) to authenticated;
