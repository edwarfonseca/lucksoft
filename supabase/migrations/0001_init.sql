-- LuckSoft — esquema inicial para Supabase (Fase 5).
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- ─────────────────────────────────────────────────────────────
-- 1) Perfiles: extienden auth.users con nombre y rol
-- ─────────────────────────────────────────────────────────────
create type user_role as enum ('docente', 'estudiante');

create table public.profiles (
  id        uuid primary key references auth.users on delete cascade,
  full_name text not null default '',
  role      user_role not null default 'estudiante'
);

alter table public.profiles enable row level security;

-- Cada usuario puede leer su propio perfil (de ahí saca su rol).
create policy "perfil propio: leer" on public.profiles
  for select using (id = auth.uid());

-- Al registrarse un usuario en Auth, se crea su perfil automáticamente.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 2) Entregas
-- ─────────────────────────────────────────────────────────────
create table public.submissions (
  id             uuid primary key default gen_random_uuid(),
  assignment_id  text not null,
  activity_title text not null,
  student_id     uuid not null references public.profiles (id) on delete cascade,
  student_name   text not null default '',
  kind           text not null check (kind in ('python', 'web', 'scratch')),
  code           text,         -- python: el código
  project        jsonb,        -- web: { html, css, js }
  project_sb3    text,         -- scratch: el .sb3 en base64
  submitted_at   timestamptz not null default now(),
  grade          int check (grade between 0 and 100),
  comment        text not null default '',
  graded_at      timestamptz,
  graded_by      uuid references public.profiles (id),
  unique (assignment_id, student_id)
);

alter table public.submissions enable row level security;

-- Helper: ¿el usuario actual es docente?
create function public.is_docente()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'docente'
  );
$$;

-- Estudiante: ve, crea y reenvía SOLO lo suyo.
create policy "alumno: leer lo suyo" on public.submissions
  for select using (student_id = auth.uid());
create policy "alumno: entregar lo suyo" on public.submissions
  for insert with check (student_id = auth.uid());
create policy "alumno: reenviar lo suyo" on public.submissions
  for update using (student_id = auth.uid());

-- Docente: ve todas las entregas y las califica.
create policy "docente: leer todo" on public.submissions
  for select using (public.is_docente());
create policy "docente: calificar" on public.submissions
  for update using (public.is_docente());