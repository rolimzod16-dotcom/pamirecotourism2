# Pamir Ecotourism redesign

Independent Next.js 14 frontend for the Pamir Ecotourism redesign. The home page now includes the hero, signature tours, schematic destination map, reasons to travel with the team, sample reviews, team, planning process, gallery preview and a three-step inquiry form. Other planned content routes have not been built yet.

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
- Add the planned destination, tour, gallery, about and contact routes. Current links to those routes are placeholders for later steps.
