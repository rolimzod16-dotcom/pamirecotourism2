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
npm run find-placeholders
```

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

The form submits `name`, `email`, and a JSON string in `message` to `POST /api/inquiry`. The newsletter sends `email` and a honeypot field to `POST /api/newsletter`. Both endpoints validate input with zod, avoid logging private values, and return demo responses. Before enabling delivery, parse and validate all fields server-side, add rate limiting and operational monitoring, and update the user-facing success messages.

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
