create extension if not exists pgcrypto;

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  name text not null,
  region text not null,
  distance_km numeric(6,2) not null,
  elevation_m integer not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  surface text not null check (surface in ('road', 'gravel', 'mixed')),
  thumbnail_url text,
  coordinates jsonb,
  description text,
  safety_notes text,
  estimated_time text,
  photos text[] not null default '{}',
  start_point jsonb,
  end_point jsonb,
  gpx_file_name text,
  route_points jsonb,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tracks_updated_at
  before update on public.tracks
  for each row execute function public.handle_updated_at();

-- RLS
alter table public.tracks enable row level security;

create policy "Published tracks are publicly readable"
  on public.tracks for select
  using (is_published = true);

-- Indexes
create index idx_tracks_region on public.tracks(region);
create index idx_tracks_published on public.tracks(is_published);
create index idx_tracks_difficulty on public.tracks(difficulty);
