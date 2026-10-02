# Pamir Ecotourism redesign

Independent Next.js 14 frontend for the Pamir Ecotourism redesign. The home page now includes the hero, signature tours, schematic destination map, reasons to travel with the team, sample reviews, team, planning process, gallery preview and a three-step inquiry form. Tour and destination listing/detail routes are now built; gallery, about and contact routes remain for later steps.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Before launch

- Replace all illustrative photos, video, portraits, reviews, badges, ratings and unverified numbers with approved material.
- Confirm team biographies, languages, route specifics, safety procedures, current prices and the reply-time promise with the operator.
- Connect a real inquiry service. `/api/inquiry` validates a small payload and logs only receipt time; it does not email or store submissions. The form explicitly tells visitors that this is a prototype.
- Add the gallery, about and contact routes. Those links remain placeholders for later steps.
- Confirm every route association, itinerary, gear list, FAQ, destination detail and image before publishing. Unknown days, distance, altitude, difficulty and season remain marked placeholders.
