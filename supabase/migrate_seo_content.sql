-- SEO title/description used in Google search results.
-- Safe to re-run.

insert into public.site_content (key, value, section, label, field_type, sort_order)
values
  (
    'seo.title',
    'New Creation Living — Structured Housing on Fixed Income',
    'Search / Google',
    'Google title',
    'text',
    0
  ),
  (
    'seo.description',
    'Structured independent living for adults on fixed government income across Metro Atlanta & Middle Georgia. All-inclusive homes from $25/day.',
    'Search / Google',
    'Google description',
    'textarea',
    0
  )
on conflict (key) do nothing;
