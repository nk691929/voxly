-- Voxly: saved results, private to each user.
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  output_type text not null check (output_type in ('email', 'notes', 'tasks', 'translate')),
  source_text text not null check (char_length(source_text) <= 20000),
  output_text text not null check (char_length(output_text) <= 60000),
  created_at timestamptz not null default now()
);

create index if not exists generations_user_created_idx
  on public.generations (user_id, created_at desc);

-- Row Level Security: the database itself refuses to show or change anyone else's rows.
alter table public.generations enable row level security;

drop policy if exists "generations_select_own" on public.generations;
drop policy if exists "generations_insert_own" on public.generations;
drop policy if exists "generations_delete_own" on public.generations;

create policy "generations_select_own" on public.generations
  for select to authenticated using (user_id = (select auth.uid()));

create policy "generations_insert_own" on public.generations
  for insert to authenticated with check (user_id = (select auth.uid()));

create policy "generations_delete_own" on public.generations
  for delete to authenticated using (user_id = (select auth.uid()));
-- No update policy on purpose: saved results cannot be edited.
