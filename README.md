# Pamir Ecotourism redesign — step 1

Independent Next.js 14 frontend scaffold. The home page intentionally contains only the shared header and footer; other routes and content sections are planned for later steps.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

The `/api/inquiry` POST handler validates `name`, `email`, and `message`, then logs a receipt without storing or sending private content. Tour details represented by `null` or empty arrays, testimonials, newsletter service, and official social links require confirmation before publication. The menu route targets will be built in later steps.
