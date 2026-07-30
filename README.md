# New Creation Living

Marketing site for New Creation Living — structured independent living for adults on fixed
government income — built with Next.js (App Router) and backed by Supabase for form submissions.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup (form backend)

The Residency/Referral form and the Benefits Screening form save submissions to Supabase.

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
   This creates two tables (`referrals` and `benefits_screenings`) with row-level security that
   only allows anonymous inserts (visitors can submit, but cannot read data back).
3. Copy `.env.local.example` to `.env.local` and fill in your project URL and anon key
   (Dashboard → Project Settings → API).
4. Restart the dev server. Submissions will now appear in the Supabase **Table Editor**.

## Project structure

- `app/` — Next.js App Router entry (`layout.tsx`, `page.tsx`) and `globals.css` (the original site styling, unchanged)
- `components/` — header, footer, video modal, back-to-top, and one component per page section
- `components/pages/ReferralPage.tsx` / `BenefitsPage.tsx` — the two forms (same UI as before)
- `app/actions/forms.ts` — Next.js server actions that insert into Supabase
- `lib/supabase.ts` — shared Supabase client helper
- `supabase/schema.sql` — database schema + RLS policies
- `public/img/` — site images

## Production build

```bash
npm run build
npm start
```
