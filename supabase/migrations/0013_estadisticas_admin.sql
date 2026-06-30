-- LuckSoft — Estadísticas del panel de admin: entregas por grupo.
-- Una entrega se atribuye a un grupo si el estudiante está inscrito en ese grupo
-- y el curso del grupo coincide con el tipo (kind) de la entrega. Función
-- SECURITY DEFINER protegida con is_admin() (los datos cruzan varios alumnos).
--   lecciones = lección más avanzada del grupo (máx. progreso de sus alumnos).
--   esperadas = entregas que debería tener el grupo = suma del progreso de cada
--               estudiante (1 entrega esperada por lección y estudiante).
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- Cambian las columnas de retorno, así que primero se elimina la versión previa.
drop function if exists public.admin_entregas_por_grupo();

create function public.admin_entregas_por_grupo()
returns table (
  horario_id   uuid,
  curso        text,
  grupo        int,
  docente      text,
  estudiantes  int,
  entregas     int,
  lecciones    int,
  esperadas    int
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
  with insc as ( -- agregados de inscripciones por grupo (sin mezclar entregas)
    select i.horario_id,
           count(*)::int                   as estudiantes,
           coalesce(max(i.progreso), 0)::int as lecciones,
           coalesce(sum(i.progreso), 0)::int as esperadas
      from public.inscripciones i
     group by i.horario_id
  ),
  entr as ( -- entregas por grupo: del curso del grupo y de sus inscritos
    select i.horario_id, count(s.id)::int as entregas
      from public.inscripciones i
      join public.horarios h2 on h2.id = i.horario_id
      join public.submissions s
        on s.student_id = i.estudiante_id and s.kind = h2.curso
     group by i.horario_id
  )
  select h.id,
         h.curso,
         h.grupo,
         coalesce(d.full_name, '')      as docente,
         coalesce(insc.estudiantes, 0)  as estudiantes,
         coalesce(entr.entregas, 0)     as entregas,
         coalesce(insc.lecciones, 0)    as lecciones,
         coalesce(insc.esperadas, 0)    as esperadas
    from public.horarios h
    left join insc on insc.horario_id = h.id
    left join entr on entr.horario_id = h.id
    left join public.profiles d on d.id = h.docente_id
   order by h.curso, h.grupo;
end;
$$;

grant execute on function public.admin_entregas_por_grupo() to authenticated;
