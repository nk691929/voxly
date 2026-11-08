-- Voxly: monthly usage tracking. Users can read their own usage but cannot write it directly.
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('transcription', 'generation')),
  created_at timestamptz not null default now()
);

create index if not exists usage_events_user_kind_created_idx
  on public.usage_events (user_id, kind, created_at desc);

alter table public.usage_events enable row level security;

drop policy if exists "usage_select_own" on public.usage_events;
create policy "usage_select_own" on public.usage_events
  for select to authenticated using (user_id = (select auth.uid()));
-- No insert, update or delete policies on purpose: only the function below can add rows,
-- and nobody can remove or edit them.

create or replace function public.consume_usage(p_kind text, p_limit integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  used integer;
begin
  if uid is null or p_kind not in ('transcription', 'generation') or p_limit < 1 then
    return false;
  end if;

  -- One request at a time per user and kind, so the count below cannot be raced.
  perform pg_advisory_xact_lock(hashtextextended(uid::text || ':' || p_kind, 0));

  select count(*) into used
  from public.usage_events
  where user_id = uid
    and kind = p_kind
    and created_at >= (date_trunc('month', now() at time zone 'utc') at time zone 'utc');

  if used >= p_limit then
    return false;
  end if;

  insert into public.usage_events (user_id, kind) values (uid, p_kind);
  return true;
end;
$$;

revoke all on function public.consume_usage(text, integer) from public, anon;
grant execute on function public.consume_usage(text, integer) to authenticated;
