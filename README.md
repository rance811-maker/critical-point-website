# CRITICAL POINT

Company website for Critical Point Internet Technology Service Limited.

Live site: https://critical-point-ai.netlify.app

## Stack

- React and vinext
- Static export hosted on Netlify
- Project brief submissions stored in Supabase
- English default with Simplified and Traditional Chinese

## Local development

```bash
pnpm install
pnpm run dev
```

Copy `.env.example` to `.env.local` and provide the public Supabase project values when form submissions should be stored.

## Production

Netlify uses `netlify.toml` to build and publish `dist/client`.

Apply `supabase/schema.sql` once in the Supabase SQL editor before enabling the production form.

## Services and conversations

The company homepage retains its existing content. The Services menu opens `/services` (Simplified Chinese), `/en/services` (English), or `/zh-hant/services` (Traditional Chinese). The page covers enterprise AI assessment, paid consultation, AI/product training, upcoming products and personal contact details. Prices and service boundaries live in `app/servicesCopy.ts`; layout lives in `app/ServicesPage.tsx` with scoped styles in `app/services.css`. Each service opens a topic-specific email draft; no booking or payment is made on the page. Résumés are shared after purpose and identity are verified; the unsupplied phone number and product links are omitted.
