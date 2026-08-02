-- New Creation Living: form submission tables
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query).

-- ============ Direct residency applications (self-apply) ============
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  gender text not null,
  date_of_birth date not null,
  benefit_type text not null,
  situation_explanation text not null,
  mobility_limitations text not null,
  mobility_explanation text,
  mental_limitations text not null,
  mental_explanation text,
  medications_independent text not null,
  crime_conviction text not null,
  crime_explanation text,
  monthly_benefit_amount text not null,
  medical_prescriptions text not null,
  medical_explanation text,
  drug_free_commitment text not null,
  value_understanding text not null,
  living_with_others text not null,
  home_not_short_term text not null,
  payee_agreement text not null,
  roommate_commitment text not null,
  referring_party_info text not null,
  how_heard text not null,
  move_timeline text not null,
  emergency_contact text
);

-- ============ Residency / Referral form ============
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  referrer_name text not null,
  referrer_role text not null,
  organization text,
  phone text not null,
  client_first_name text not null,
  client_last_name text not null,
  client_phone text,
  client_email text,
  gender text not null,
  date_of_birth date not null,
  benefit_type text not null,
  situation_explanation text not null,
  mobility_limitations text not null,
  mobility_explanation text,
  mental_limitations text not null,
  mental_explanation text,
  medications_independent text not null,
  crime_conviction text not null,
  crime_explanation text,
  monthly_benefit_amount text not null,
  medical_prescriptions text not null,
  medical_explanation text,
  drug_free_commitment text not null,
  value_understanding text not null,
  living_with_others text not null,
  home_not_short_term text not null,
  payee_agreement text not null,
  roommate_commitment text not null,
  how_heard text not null,
  move_timeline text not null,
  emergency_contact text
);

-- ============ Tour scheduling requests ============
create table if not exists public.tour_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  preferred_date date not null,
  gender text not null
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
alter table public.referrals enable row level security;
alter table public.applications enable row level security;
alter table public.tour_requests enable row level security;
alter table public.benefits_screenings enable row level security;

drop policy if exists "Allow anonymous referral submissions" on public.referrals;
create policy "Allow anonymous referral submissions"
  on public.referrals
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous application submissions" on public.applications;
create policy "Allow anonymous application submissions"
  on public.applications
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous tour request submissions" on public.tour_requests;
create policy "Allow anonymous tour request submissions"
  on public.tour_requests
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous benefits screening submissions" on public.benefits_screenings;
create policy "Allow anonymous benefits screening submissions"
  on public.benefits_screenings
  for insert
  to anon
  with check (true);
