-- Add contact fields to tour_requests.
-- Safe to re-run.

alter table public.tour_requests add column if not exists phone text;
alter table public.tour_requests add column if not exists email text;

-- Backfill any existing rows so NOT NULL can be applied safely.
update public.tour_requests set phone = '' where phone is null;
update public.tour_requests set email = '' where email is null;

alter table public.tour_requests alter column phone set not null;
alter table public.tour_requests alter column email set not null;
