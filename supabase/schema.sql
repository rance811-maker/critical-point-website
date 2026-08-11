create table if not exists public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  problem text not null check (char_length(problem) between 10 and 4000),
  stage text not null check (char_length(stage) between 2 and 120),
  contact text not null check (char_length(contact) between 3 and 500),
  locale text not null default 'en' check (locale in ('en', 'zh-Hans', 'zh-Hant')),
  source_url text check (source_url is null or char_length(source_url) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.project_briefs enable row level security;

drop policy if exists "allow anonymous project brief submissions" on public.project_briefs;

create policy "allow anonymous project brief submissions"
on public.project_briefs
for insert
to anon
with check (
  char_length(problem) between 10 and 4000
  and char_length(stage) between 2 and 120
  and char_length(contact) between 3 and 500
);

revoke all on table public.project_briefs from anon;
grant insert on table public.project_briefs to anon;
