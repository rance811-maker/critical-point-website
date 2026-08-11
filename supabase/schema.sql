create table if not exists public.critical_point_project_briefs (
  id uuid primary key default gen_random_uuid(),
  problem text not null check (char_length(problem) between 10 and 4000),
  stage text not null check (char_length(stage) between 2 and 120),
  contact text not null check (char_length(contact) between 3 and 500),
  locale text not null default 'en' check (locale in ('en', 'zh-Hans', 'zh-Hant')),
  source_url text check (source_url is null or char_length(source_url) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.critical_point_project_briefs enable row level security;

create policy "allow anonymous critical point brief submissions"
on public.critical_point_project_briefs
for insert
to anon
with check (
  char_length(problem) between 10 and 4000
  and char_length(stage) between 2 and 120
  and char_length(contact) between 3 and 500
);

grant insert on table public.critical_point_project_briefs to anon;
