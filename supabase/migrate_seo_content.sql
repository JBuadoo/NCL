-- SEO title/description used in Google search results.
-- Safe to re-run. Description is upserted so the live Google snippet updates.

insert into public.site_content (key, value, section, label, field_type, sort_order)
values
  (
    'seo.title',
    'New Creation Living — Structured Housing on Fixed Income',
    'Search / Google',
    'Google title',
    'text',
    0
  )
on conflict (key) do nothing;

insert into public.site_content (key, value, section, label, field_type, sort_order)
values
  (
    'seo.description',
    'New Creation Living provides all-inclusive homes for independent adults on fixed incomes. We also help individuals access and obtain government benefits and resources they may qualify for. Our goal is to provide safe, supportive housing and help individuals build greater stability and independence.',
    'Search / Google',
    'Google description',
    'textarea',
    0
  )
on conflict (key) do update
set
  value = excluded.value,
  section = excluded.section,
  label = excluded.label,
  field_type = excluded.field_type,
  sort_order = excluded.sort_order,
  updated_at = now();
