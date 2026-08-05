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
   This creates four tables (`applications`, `referrals`, `tour_requests`, and
   `benefits_screenings`) with row-level security that only allows anonymous inserts
   (visitors can submit, but cannot read data back).
3. Copy `.env.local.example` to `.env.local` and fill in your project URL and anon key
   (Dashboard → Project Settings → API).
4. Restart the dev server. Submissions will now appear in the Supabase **Table Editor**.

## Email + SMS notifications

Every successful form submission (self application, referral, tour request, benefits screening) triggers:

1. A **staff email** via [Resend](https://resend.com) to `NOTIFY_EMAIL`
2. A **confirmation email** via Resend to the person who submitted the form
3. An **SMS** via [Twilio](https://www.twilio.com) to `NOTIFY_PHONE`

Add these to `.env.local` (see `.env.local.example`):

| Variable | Purpose |
|---|---|
| `NOTIFY_EMAIL` | Inbox(es) for staff alerts. Comma-separated OK. Prefer a real mailbox you check — not only `support@` if MX is on Resend Receiving |
| `NOTIFY_PHONE` | Phone that receives texts (E.164, e.g. `+14047312371`) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified From address for customer emails |
| `RESEND_STAFF_FROM_EMAIL` | Optional From for staff alerts (recommended: `notifications@…`) |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` | Twilio credentials |

Staff alerts and customer confirmations use Resend. If notification settings are missing, the form still saves to Supabase — notifications are skipped and logged. Notification failures never fail the visitor's submit.

## Project structure

- `app/` — Next.js App Router entry (`layout.tsx`, `page.tsx`) and `globals.css` (the original site styling, unchanged)
- `components/` — header, footer, video modal, back-to-top, and one component per page section
- `components/pages/ReferralPage.tsx` — residency CTAs (Apply / Refer) + tour card
- `app/apply` / `app/refer` / `app/benefits` — guided multi-step onboarding flows
- `components/pages/BenefitsPage.tsx` — benefits section CTA (starts `/benefits` flow)
- `app/actions/forms.ts` — Next.js server actions that insert into Supabase and trigger notify
- `lib/notify.ts` — Resend email + Twilio SMS helper
- `lib/supabase.ts` — shared Supabase client helper
- `supabase/schema.sql` — database schema + RLS policies
- `supabase/migrate_residency_fields.sql` — migration if older tables already exist
- `public/img/` — site images

## Production build

```bash
npm run build
npm start
```
