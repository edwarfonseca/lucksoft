-- LuckSoft — Vista del docente: estudiantes de uno de sus grupos.
-- El docente no puede leer los perfiles de otros por RLS, así que se expone una
-- función SECURITY DEFINER que devuelve los estudiantes de un grupo SOLO si ese
-- grupo es del docente autenticado (horarios.docente_id = auth.uid()).
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

create or replace function public.docente_estudiantes_grupo(p_horario_id uuid)
returns table (
  id               uuid,
  full_name        text,
  edad             int,
  creditos         int,
  nombre_acudiente text,
  numero_acudiente text,
  pais             text,
  activo           boolean
)
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Solo el docente dueño del grupo puede ver a sus estudiantes.
  if not exists (
    select 1 from public.horarios h
     where h.id = p_horario_id and h.docente_id = auth.uid()
  ) then
    raise exception 'No autorizado';
  end if;

  return query
    select p.id,
           coalesce(p.full_name, '')        as full_name,
           p.edad,
           coalesce(p.creditos_pagados, 0)  as creditos,
           p.nombre_acudiente,
           p.numero_acudiente,
           p.pais,
           p.activo
      from public.inscripciones i
      join public.profiles p on p.id = i.estudiante_id
     where i.horario_id = p_horario_id
     order by p.full_name;
end;
$$;

grant execute on function public.docente_estudiantes_grupo(uuid) to authenticated;
