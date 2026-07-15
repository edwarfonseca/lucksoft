-- LuckSoft — La tarea para la casa cuenta en las estadísticas de admin.
-- Desde ahora cada lección de Python y Diseño Web espera 2 entregas por
-- estudiante: la de clase y la tarea para la casa (id `p·s-casa`). Scratch
-- sigue esperando 1 porque su editor entrega el proyecto como una única
-- entrega (una nueva reemplaza la anterior).
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

create or replace function public.admin_entregas_por_grupo()
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
           count(*)::int                     as estudiantes,
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
         -- 2 entregas esperadas por lección (clase + tarea de casa), salvo Scratch.
         case when h.curso = 'scratch'
              then coalesce(insc.esperadas, 0)
              else coalesce(insc.esperadas, 0) * 2
         end                            as esperadas
    from public.horarios h
    left join insc on insc.horario_id = h.id
    left join entr on entr.horario_id = h.id
    left join public.profiles d on d.id = h.docente_id
   order by h.curso, h.grupo;
end;
$$;

grant execute on function public.admin_entregas_por_grupo() to authenticated;
