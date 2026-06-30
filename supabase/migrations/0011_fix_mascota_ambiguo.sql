-- LuckSoft — Fix: "column reference 'energia' is ambiguous" al alimentar.
-- La función mascota_alimentar declara `returns table (..., energia int, ...)`,
-- así que dentro del UPDATE la palabra `energia` era ambigua entre la columna de
-- la tabla `mascotas` y la columna de salida. Se califican con la tabla.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

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

  -- Calificamos las columnas con la tabla: 'energia' también es una columna de
  -- salida (RETURNS TABLE) y sin calificar sería ambigua.
  update public.mascotas
     set energia          = least(100, mascotas.energia + v_energia),
         monedas_gastadas = mascotas.monedas_gastadas + v_costo,
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

grant execute on function public.mascota_alimentar(text) to authenticated;
