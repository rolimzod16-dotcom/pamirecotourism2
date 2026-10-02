# Pamir Ecotourism frontend

Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, `next/image`, react-hook-form, zod, and React Leaflet. The site has a home page, ten tour pages, twelve destination pages, gallery, about, and contact. **It is a prototype:** inquiry and newsletter endpoints validate requests but do not send or store them.

## Run locally

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:smoke
npm run check
npm run find-placeholders
```

`npm run check` runs lint, TypeScript, the production build and Playwright smoke tests across 360, 768 and 1440 px. The test runner uses a packaged Chromium executable when a regular Playwright browser download is unavailable. The browser package is a development dependency and adds time to `npm ci`.

## Project layout

| Path | Purpose |
| --- | --- |
| `app/` | Routes, metadata routes, error pages, and API stubs |
| `components/` | Shared UI, cards, filters, lightbox, forms, and map |
| `content/` | English page copy and UI labels, ready for later localization |
| `data/` | Typed tour, destination, team, review, gallery and contact data |
| `lib/seo.ts` | Canonical site URL, metadata helper and social profile list |
| `public/placeholders/` | Temporary illustrative images and video |
| `scripts/find-placeholders.mjs` | Scans source files for `[placeholder` and `[confirm` markers |
| `tests/`, `playwright.config.ts` | Route, responsive and interaction smoke tests |
| `AUDIT.md` | Step 6 findings, corrections and remaining limitations |

## Replace before publication

The `find-placeholders` command prints file and line numbers. Markers also appear as `[X]`, `[add real]`, and `[year placeholder]` in the site copy.

| File | Real content needed |
| --- | --- |
| `public/placeholders/*`, `data/gallery.ts`, `content/home.ts` | Licensed destination, tour, team and gallery photography, video, exact captions, alt text and credits. Gallery images are intentionally repeated. |
| `data/reviews.ts`, `content/home.ts` | Six approved testimonials, names, countries, sources, real ratings, trust badges and verified experience/traveler counts. Remove illustrative examples. |
| `data/team.ts`, `content/pages.ts` | Approved portraits, detailed biographies, languages, Instagram URLs if available, founding year and the owners' actual story. |
| `data/tours.ts`, `content/routes.ts` | Current prices, duration, distance, maximum altitude, difficulty, season, group sizes, route associations, every itinerary day, gear, inclusions, exclusions, safety practices and FAQ answers. Three sample days do **not** establish a real trip length. |
| `data/destinations.ts`, `content/pages.ts` | Confirmed regions, highlights, access, season, tour associations and route-specific advice. Map coordinates are approximate. |
| `content/pages.ts` (`about`, `contact`) | Responsible travel commitments, license numbers, memberships, partners, office hours, reply times, payment terms and contact FAQ. |
| `components/OfficeLeaflet.tsx`, `data/site.ts` | Exact office coordinates and address. Current map pin is for the approximate Rushan town area, not the office entrance. |
| `lib/seo.ts`, `components/Footer.tsx` | Verified official social profile URLs; `sameAs` is empty and no profile links are shown. |
| `app/api/inquiry/route.ts`, `app/api/newsletter/route.ts` | Real delivery and mailing list integration. Until then, success screens explicitly state that nothing was delivered or subscribed. |

## Connect the forms

The form submits `name`, `email`, `website` (honeypot), and a JSON string in `message` to `POST /api/inquiry`. The newsletter sends `email` and a honeypot field to `POST /api/newsletter`. Both endpoints validate input with zod, avoid logging private values, limit request size and return demo responses. They allow five requests per IP and endpoint per minute in memory. This limit resets on restart, is separate on each serverless instance, and depends on proxy headers; use a shared, trusted rate limiter and operational monitoring before enabling delivery. Update the user-facing success messages when real delivery works.

For example, install `resend` and replace the inquiry stub's success path **after** validation:

```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
const { error } = await resend.emails.send({
  from: process.env.MAIL_FROM!,
  to: process.env.CONTACT_TO_EMAIL!,
  subject: 'New Pamir Ecotourism inquiry',
  text: `Name: ${name}\nEmail: ${email}\nDetails: ${message}`,
});
if (error) throw error;
```

Use a verified sending domain. For the newsletter, connect a real mailing provider, record consent, and confirm subscription before showing a real success state. With Resend's current Contacts API, the server-side operation can call `resend.contacts.create({ email, unsubscribed: false })` after your chosen consent flow; handle provider errors and duplicates. See [Resend's Next.js guide](https://resend.com/nextjs) and [Contacts documentation](https://resend.com/features/audiences). No provider package or credentials are included in this prototype.

## Add a tour or destination

Add a typed record to `data/tours.ts` or `data/destinations.ts`. The detail URL, listing and sitemap derive from the arrays. Supply a unique `slug`, approved image and copy, and all detail fields. Associate tours with destination slugs in `Tour.destinations` only after the operator verifies the route. Confirm metadata and structured data after replacing placeholders.

## Deploy on Vercel

Import `rolimzod16-dotcom/pamirecotourism2` as a Next.js project; `npm ci` and `npm run build` are sufficient. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin for canonical URLs, sitemap and JSON-LD. The code falls back to `https://pamirecotourism.com` locally, but explicitly set it for production and previews. After adding real form delivery, set server-only `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `MAIL_FROM` in Vercel; never prefix secrets with `NEXT_PUBLIC_`. Connect the domain only after reviewing the finished deployment and preserving existing email DNS records.

OpenStreetMap tiles require a network connection; attribution is displayed. Check usage policy and choose an appropriate tile provider before significant production traffic.

## Before launch

- Replace every placeholder, illustrative photo and video, and approximate office pin with approved assets and facts; run `npm run find-placeholders`.
- Add genuine reviews, ratings, badges, licenses and verified social links.
- Confirm all prices, itineraries, route associations, durations, seasons, safety copy and response-time promises with the owners.
- Connect inquiry and newsletter forms to a real delivery service with consent handling and a shared rate limiter; test receipt end to end.
- Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin, review metadata and structured data, and run `npm run check`.
- Run Lighthouse on the production deployment for home, a tour detail page and gallery, including mobile and slow-network profiles. Resolve any score below Performance 90, Accessibility 95, Best Practices 95 and SEO 100 before launch.
