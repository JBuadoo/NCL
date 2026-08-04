-- Add referrer email on referrals (needed for confirmation emails).
-- Safe to re-run.

alter table public.referrals add column if not exists email text;

update public.referrals set email = '' where email is null;

alter table public.referrals alter column email set not null;
