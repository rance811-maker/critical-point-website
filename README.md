# CRITICAL POINT

Company website for Critical Point Internet Technology Service Limited.

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
