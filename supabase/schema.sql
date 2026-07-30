-- New Creation Living: form submission tables
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query).

-- ============ Residency / Referral form ============
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  referrer_name text not null,
  referrer_role text not null,
  organization text,
  phone text not null,
  client_name text not null,
  benefit_type text not null,
  notes text
);

-- ============ Benefits screening form ============
create table if not exists public.benefits_screenings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  benefit_type text not null,
  applied_before text not null,
  notes text
);

-- ============ Row Level Security ============
-- Anonymous site visitors may INSERT (submit forms) but never read, update,
-- or delete. Review submissions from the Supabase dashboard or an authenticated
-- admin tool.
alter table public.referrals enable row level security;
alter table public.benefits_screenings enable row level security;

drop policy if exists "Allow anonymous referral submissions" on public.referrals;
create policy "Allow anonymous referral submissions"
  on public.referrals
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous benefits screening submissions" on public.benefits_screenings;
create policy "Allow anonymous benefits screening submissions"
  on public.benefits_screenings
  for insert
  to anon
  with check (true);
