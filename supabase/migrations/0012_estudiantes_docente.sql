-- LuckSoft — Calificar por curso: que el docente solo vea a SUS estudiantes.
-- Las políticas RLS de `inscripciones` no dejan al docente leer las inscripciones
-- de otros, así que se expone una función SECURITY DEFINER que devuelve, de forma
-- segura, solo los estudiantes inscritos en los grupos que él dicta (con el curso
-- de cada grupo). El docente filtra las entregas en el cliente con esta lista.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

create or replace function public.mis_estudiantes()
returns table (estudiante_id uuid, curso text)
language sql
security definer
set search_path = public
as $$
  select distinct i.estudiante_id, h.curso
    from public.inscripciones i
    join public.horarios h on h.id = i.horario_id
   where h.docente_id = auth.uid();
$$;

grant execute on function public.mis_estudiantes() to authenticated;
