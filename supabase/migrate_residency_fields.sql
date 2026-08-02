-- Run this if you already created the older applications/referrals tables.
-- Safe to re-run: uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS where supported.

-- Applications: add new columns
alter table public.applications add column if not exists gender text;
alter table public.applications add column if not exists date_of_birth date;
alter table public.applications add column if not exists situation_explanation text;
alter table public.applications add column if not exists mobility_limitations text;
alter table public.applications add column if not exists mobility_explanation text;
alter table public.applications add column if not exists mental_limitations text;
alter table public.applications add column if not exists mental_explanation text;
alter table public.applications add column if not exists medications_independent text;
alter table public.applications add column if not exists crime_conviction text;
alter table public.applications add column if not exists crime_explanation text;
alter table public.applications add column if not exists monthly_benefit_amount text;
alter table public.applications add column if not exists medical_prescriptions text;
alter table public.applications add column if not exists medical_explanation text;
alter table public.applications add column if not exists drug_free_commitment text;
alter table public.applications add column if not exists value_understanding text;
alter table public.applications add column if not exists living_with_others text;
alter table public.applications add column if not exists home_not_short_term text;
alter table public.applications add column if not exists payee_agreement text;
alter table public.applications add column if not exists roommate_commitment text;
alter table public.applications add column if not exists referring_party_info text;
alter table public.applications add column if not exists how_heard text;
alter table public.applications add column if not exists move_timeline text;
alter table public.applications add column if not exists emergency_contact text;

-- Prefer dropping the old short referrals table and recreating (column shape changed).
-- If you need to keep old referral rows, export them first.
drop table if exists public.referrals cascade;

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  referrer_name text not null,
  referrer_role text not null,
  organization text,
  phone text not null,
  referee_first_name text not null,
  referee_last_name text not null,
  referee_phone text,
  referee_email text,
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

alter table public.referrals enable row level security;

drop policy if exists "Allow anonymous referral submissions" on public.referrals;
create policy "Allow anonymous referral submissions"
  on public.referrals
  for insert
  to anon
  with check (true);

-- If you already created referrals with client_* columns, rename them:
-- alter table public.referrals rename column client_first_name to referee_first_name;
-- alter table public.referrals rename column client_last_name to referee_last_name;
-- alter table public.referrals rename column client_phone to referee_phone;
-- alter table public.referrals rename column client_email to referee_email;
