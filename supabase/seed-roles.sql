-- LuckSoft — asigna rol y nombre a los usuarios demo (Fase 5).
-- Ejecútalo DESPUÉS de crear los 3 usuarios en Authentication > Users.
-- Pega TODO en el SQL Editor de Supabase y pulsa "Run".

update public.profiles
   set role = 'docente', full_name = 'Prof. García'
 where id = (select id from auth.users where email = 'docente@lucksoft.local');

update public.profiles
   set full_name = 'Ana López'
 where id = (select id from auth.users where email = 'alumno@lucksoft.local');

update public.profiles
   set full_name = 'Luis Pérez'
 where id = (select id from auth.users where email = 'alumno2@lucksoft.local');

-- Comprueba el resultado:
select p.full_name, p.role, u.email
  from public.profiles p
  join auth.users u on u.id = p.id
 order by p.role;