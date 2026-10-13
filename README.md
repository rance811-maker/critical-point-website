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

## More services and unified contact

The company homepage retains its business content and links to `/services` (Simplified Chinese), `/en/services` (English), or `/zh-hant/services` (Traditional Chinese). Existing homepage `#contact` links redirect to the matching service page. Enterprise AI work is described in the introduction and quoted by project; the page then presents paid consultation, AI/product training, upcoming free AI products, and contact/social accounts without repeating the founder biography.

The unified contact form is now on the service page. Service links preselect a topic using `?service=career#enquiry` (or another valid service ID). Enterprise enquiries retain the original four project stages; other topics store the chosen topic label in `stage`, which matches the existing `supabase/schema.sql` text constraint. Scope, prices and résumé-sharing conditions are unchanged. There is no automatic payment or booking.

`app/ServicesPage.tsx` and `app/services.css` define the page. `app/ServiceEnquiryForm.tsx`, `app/service-enquiry.ts` and `app/service-enquiry.css` define form behaviour and styles. The original Supabase table and Netlify form name/notification endpoint are retained. When storage is not configured, the visitor gets a complete email draft and must send it themselves; a saved enquiry is not treated as failed solely because notification fails. Form tests use mocks and do not send live enquiries.

The unsupplied phone number and product links remain omitted. Résumés are shared only after purpose and identity are verified.

Consultation cards use a three-column desktop layout, compact service descriptions, and a four-region residency list focused on skilled migration, with TTPS noted under Hong Kong. Service CTAs target `#enquiry` directly; the general `#contact` section remains for social accounts. Older service links ending in `#contact` are redirected to the enquiry panel after topic selection. Household finance uses a decorative SVG illustration, while the cat icon is retained; AI education features the supplied product video.

Consultation and both training topics share one hourly rate: HKD 700 / RMB 600. The training rate is displayed once below the introduction. The product catalogue in `app/ProductExperiences.tsx` links to Grammar Quest, Spoken Grammar, Mao Ban, VigorWealth and the RMB decision tool. The VigorWealth entry uses the working root URL. Its local-only privacy feature is explicitly marked as a goal under development, while the RMB tool records entered financial data in the browser. `app/GrammarQuestShowcase.tsx` presents AI Education as one full-width row: both education products on the left and the supplied portrait video on the right. The second row places Mao Ban on the left and a wider finance section on the right, with VigorWealth and the RMB tool side by side. Mobile layouts stack the panels. The full portrait frame is preserved, with a poster, manual playback controls and no autoplay.
