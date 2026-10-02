# Step 6 quality audit

Audit date: 2026-10-02. Scope: home, six static routes and all 22 generated detail pages. This document records findings before fixes, followed by verification results after changes.

## Baseline checks

- `npm run lint`: pass, no ESLint warnings.
- `npm run typecheck`: pass.
- `npm run build`: pass, 40 generated/static route entries. npm prints an environment `http-proxy` configuration warning; it is external to this repository.
- Initial JS shown by Next build: home 176 kB, tours 145 kB, tour detail 138 kB, destinations 145 kB, destination detail 137 kB, gallery 142 kB, about 137 kB, contact 164 kB. These are transfer estimates from Next, not Lighthouse results.
- Initial `npm run find-placeholders`: 37 source lines. Exact path:line listing is available from that command; inventory below groups every file category without pretending sample content is verified.

## Findings before fixes

1. Browser viewport and keyboard behavior had not been tested at 360, 768 and 1440 px. A production build alone does not establish no overflow or keyboard usability. Playwright browser availability must be established before this can be marked verified.
2. Header begins transparent with white text on every route, including routes whose content behind the header may scroll to light sections. The transition works by scroll threshold but route-aware solid state is needed.
3. Global WhatsApp button can overlap the mobile tour booking bar. The home StickyCTA and WhatsApp button share the same bottom edge and can crowd a 360 px viewport.
4. Hero video respects reduced motion but does not inspect `navigator.connection.saveData`. Header and gallery motion need consistent reduced-motion treatment.
5. Gallery lightbox is included in the initial component bundle despite being closed on first render. The gallery has blurred images but no loading placeholder for data hydration; maps already reserve height.
6. Accordion IDs derive from titles and can repeat across separate accordions on a page. Keyboard controls need a route-wide accessibility pass.
7. Several controls are smaller than 44 px: some carousel arrows, header navigation rows, map pin controls (44 px exactly), and small text links. Focus style exists globally but contrast and visibility require browser checks.
8. Dark image cards rely on a bottom gradient. Their small metadata and links may need a stronger overlay to maintain AA contrast on the brightest placeholder image.
9. API stubs validate narrow payloads but have no rate limit. Inquiry does not validate the structured details inside `message`; newsletter has a honeypot, inquiry honeypot is filtered client-side only. No current storage or delivery exists.
10. No Playwright smoke suite or `npm run check` command exists. No security header configuration exists.
11. Hero `priority` is used on some detail images; the request is to reserve priority for the first hero poster only. Media aspect ratios are mostly reserved, but this should be checked in a viewport.
12. Social proof, team details, credentials, route details, photos, and response claims are placeholders. Production Lighthouse scores cannot be reported until a deployed site is measured.

## Placeholder inventory at baseline

- `content/home.ts`: experience, traveler counts, rating, verified review promise, route facts and reply-time promise.
- `content/pages.ts`: about story, values, responsible travel, badges, office map, hours, response time and FAQ answers.
- `content/routes.ts`: route, itinerary, gear, season, distance, altitude and safety labels.
- `data/reviews.ts`: six illustrative reviews, names, country flags and ratings.
- `data/team.ts`: portrait, biography, languages and social profiles.
- `data/tours.ts`: itinerary days, overnights, included/excluded items, gear, FAQs and unverified destination associations.
- `data/destinations.ts`: regions, highlights, seasons, access and repeated images.
- `data/gallery.ts`: all 24 captions and repeated images.
- `lib/seo.ts`: official social profile URLs absent.
- `public/placeholders/`: illustrative images and video, not actual trip photography.

## Verification after fixes

- `npm run check`: pass. Lint and typecheck have no errors or project warnings; optimized build generated 40 route entries, including all ten tours and twelve destinations; 102 Playwright tests passed across 360, 768 and 1440 px. External console notices: npm's `http-proxy` configuration deprecation and Playwright's `NO_COLOR`/`FORCE_COLOR` conflict. No application build warnings.
- Automated browser audit: all 28 content routes return 200, have one `main h1`, header/main/footer landmarks, alt attributes on images, and no document-wide horizontal overflow at all three widths. Screenshots of home, tour, gallery and contact were checked for clipped text, card layout, visual contrast and mobile fixed elements. The mobile tour booking bar includes WhatsApp; the global floating button is suppressed on tour detail pages. The home sticky CTA appears only beyond the hero and hides at inquiry.
- Keyboard tests cover the skip link, mobile menu expansion, tour filters, gallery arrows/Escape, focus trap and focus restoration. Form tests cover step validation and demo submission. Accordions have unique `aria-controls` IDs and buttons with `aria-expanded`; filters expose `aria-pressed` and result counts use `aria-live`. Visible focus outlines are global. Reduced-motion tests confirm the video is absent and the poster remains. Slow data connections also use the poster. No parallax is used.
- Image overlays were strengthened for copy contrast; dim footer text was brightened. Tap targets were enlarged on filters, mobile menu, carousel arrows, map card controls and small journey links. Hero poster alone is marked `priority`; other imagery is lazy by default. Map and image grids reserve aspect/height; lightbox and map are loaded dynamically. Fonts use `display: swap` with Latin subsets. The gallery uses blur placeholders while images load.
- Server handlers validate both form payloads with zod, including nested inquiry details; cap body size, retain honeypots and limit each endpoint to five requests per IP per minute in memory. Security headers are sent on all paths. The limiter is per process, resets on restart and trusts proxy headers; it must be replaced with shared trusted storage before production traffic. Forms still do not deliver or retain inquiries.

### Bundle size by route

From the final `next build` First Load JS column: home 175 kB; tours 145 kB; tour detail 138 kB; destinations 145 kB; destination detail 137 kB; gallery 142 kB; about 137 kB; contact 165 kB. Shared JS is 87.4 kB. These are Next's route estimates, not transferred bytes from a production CDN.

### Lighthouse-style local measurements

Lighthouse 13.5.0 against a local production build using bundled Chromium 153. Scores are diagnostic and can change with real media, third-party services, hosting, caching, devices and network conditions.

| Route | Profile | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Home | Mobile | 91 | 100 | 100 | 100 |
| 4x4 Tour detail | Mobile | 96 | 100 | 100 | 100 |
| Gallery | Mobile | 96 | 100 | 100 | 100 |
| Home | Desktop | 99 | 100 | 100 | 100 |
| 4x4 Tour detail | Desktop | 100 | 100 | 100 | 100 |
| Gallery | Desktop | 100 | 100 | 100 | 100 |

No measured local score is below the requested 90 / 95 / 95 / 100 thresholds. Production scores remain unmeasured. The home mobile Performance margin is one point, so real high-resolution media or network-hosted map tiles may put it below 90. These synthetic scores do not prove complete WCAG conformance or verify owner-provided content.

### Exact marker list

The command `npm run find-placeholders` finds these 37 source lines (line numbers can change after editing):

```text

content/pages.ts:13: '[Placeholder — owners to replace] Tell the story of how the company began in Rushan and who started it.',
content/pages.ts:14: '[Placeholder — owners to replace] Explain how the team plans journeys and works with local guides and hosts.',
content/pages.ts:15: '[Placeholder — owners to replace] Share what visitors can expect from the people they will meet along the way.',
content/pages.ts:18: { icon: 'map', title: 'Local first', text: '[Confirm with owners] Explain how local knowledge shapes route planning and hosting.' },
content/pages.ts:19: { icon: 'shield', title: 'Safety', text: '[Confirm with owners] Describe actual briefings, support and emergency procedures.' },
content/pages.ts:20: { icon: 'users', title: 'Small groups', text: '[Confirm with owners] State the real group-size approach for each type of trip.' },
content/pages.ts:21: { icon: 'leaf', title: 'Respect for nature and culture', text: '[Confirm with owners] Describe specific visitor guidance and community practices.' },
content/pages.ts:24: '[Confirm with owners] How the company works with local families and businesses.',
content/pages.ts:25: '[Confirm with owners] How waste, water and sensitive landscapes are handled on trips.',
content/pages.ts:26: '[Confirm with owners] How guests are guided to respect local customs and communities.',
content/pages.ts:35: mapTitle: 'Find us in Rushan', mapNote: '[Placeholder pin] Approximate Rushan area only; confirm the precise office location with the team.',
content/pages.ts:37: hours: 'Working hours: [confirm with owners]', reply: 'Response time: [confirm with owners]',
content/pages.ts:39: { question: 'Do I need a permit or visa?', answer: '[Confirm] Requirements depend on nationality and route. Check current official guidance and ask the team about the GBAO permit.' },
content/pages.ts:40: { question: 'When is the best season?', answer: '[Confirm] The suitable months vary by route and conditions; ask the team about your dates.' },
content/pages.ts:41: { question: 'What should I pack?', answer: '[Confirm] Your packing list depends on activities, altitude and season. Request a trip-specific list.' },
content/pages.ts:42: { question: 'How is safety handled?', answer: '[Confirm] Ask for the actual guide, briefing, vehicle and emergency arrangements for your journey.' },
content/pages.ts:43: { question: 'How do payments work?', answer: '[Confirm] Ask the team for accepted payment methods, timing and cancellation terms in writing.' },
content/routes.ts:14: safetyText: '[Placeholder] Ask the operator to confirm guide arrangements, route briefing, emergency contacts, vehicle condition and current travel conditions in writing.',
data/gallery.ts:32: alt: `[Placeholder image ${index + 1}] Illustrative ${seed.label}.`,
data/gallery.ts:33: caption: `[Placeholder caption] ${seed.category} · image ${index + 1}. Replace with verified location and photographer credit.`,
data/reviews.ts:4: { id: 'sample-1', quote: '[Placeholder review] A traveler story about a mountain journey will appear here after approval.', author: 'Sample traveler 01', countryFlag: '🇩🇪', tripTitle: '4x4 Tour', rating: '[X]/5', avata
data/reviews.ts:5: { id: 'sample-2', quote: '[Placeholder review] This space is reserved for a real guest’s account of the lakes and trails.', author: 'Sample traveler 02', countryFlag: '🇫🇷', tripTitle: 'Trekking Mt. Lakes', rating: '[X]
data/reviews.ts:6: { id: 'sample-3', quote: '[Placeholder review] Add a verified guest quote, with their permission, before publishing.', author: 'Sample traveler 03', countryFlag: '🇬🇧', tripTitle: 'Fan Mountain Lakes', rating: '[X]/5', 
data/reviews.ts:7: { id: 'sample-4', quote: '[Placeholder review] A specific memory from a real expedition belongs here.', author: 'Sample traveler 04', countryFlag: '🇮🇹', tripTitle: 'Pamir Classical 4x4', rating: '[X]/5', avatar: null, 
data/reviews.ts:8: { id: 'sample-5', quote: '[Placeholder review] Replace this sample with an approved testimonial and source.', author: 'Sample traveler 05', countryFlag: '🇳🇱', tripTitle: 'Trekking Cross Border', rating: '[X]/5', avatar
data/reviews.ts:9: { id: 'sample-6', quote: '[Placeholder review] Add a real traveler’s own words after verification.', author: 'Sample traveler 06', countryFlag: '🇺🇸', tripTitle: 'Motorcycle Tour in High Pamirs', rating: '[X]/5', avatar
data/team.ts:4: { name: 'Sultonsho Guliev', role: 'Executive Director, Co-founder', portrait, bio: '[Bio to be confirmed with the team.]', expandedBio: '[Placeholder — confirm with this team member] Add their background, role on journey
data/team.ts:5: { name: 'Nasrullo Alinazarov', role: 'Co-founder, Director', portrait, bio: '[Bio to be confirmed with the team.]', expandedBio: '[Placeholder — confirm with this team member] Add their background, role on journeys and p
data/team.ts:6: { name: 'Gulomsho Alinazarov', role: 'Tour Manager', portrait, bio: '[Bio to be confirmed with the team.]', expandedBio: '[Placeholder — confirm with this team member] Add their background, role on journeys and personal 
data/team.ts:7: { name: 'Cinzia Sippelli', role: 'Travel Consultant for Europe', portrait, bio: '[Bio to be confirmed with the team.]', expandedBio: '[Placeholder — confirm with this team member] Add their background, role on journeys a
data/tours.ts:13: day, title: `[Placeholder] Day ${day} plan to confirm`,
data/tours.ts:18: { question: 'What is included?', answer: '[Placeholder] The team will confirm transport, accommodation, meals, permits and exclusions in a written quote.' },
data/tours.ts:19: { question: 'How difficult is this trip?', answer: '[Placeholder] Ask the team for the route, conditions and fitness guidance for your dates.' },
data/tours.ts:20: { question: 'Can the itinerary change?', answer: '[Placeholder] Discuss your dates and interests directly with the team before confirming.' },
data/tours.ts:41: hook: `[Placeholder] Explore the ${tour.title} route with a local team.`,
data/tours.ts:42: overview: `[Placeholder] The exact route, pace and travel arrangements for ${tour.title} will be confirmed with the operator before booking.`,
lib/seo.ts:9: // [confirm] Add verified official social profile URLs before launch.
```
