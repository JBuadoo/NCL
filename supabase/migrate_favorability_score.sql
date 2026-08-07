-- Favorability score for applications and referrals (0–100% based on ideal responses).
-- Safe to re-run.

alter table public.applications add column if not exists favorability_score integer;
alter table public.applications add column if not exists favorability_max_score integer;
alter table public.applications add column if not exists favorability_percent integer;
alter table public.applications add column if not exists favorability_label text;

alter table public.referrals add column if not exists favorability_score integer;
alter table public.referrals add column if not exists favorability_max_score integer;
alter table public.referrals add column if not exists favorability_percent integer;
alter table public.referrals add column if not exists favorability_label text;
