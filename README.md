# ADP Toiture SA

Website for ADP Toiture SA, roofing in Geneva (ferblanterie, couverture, étanchéité).
Next.js 16 (App Router), React 19, TypeScript, plain CSS.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export of the single page
npm start
```

## Layout

- Mobile first. From 1024 px the page reproduces the desktop mockup: `1rem` = 10 mockup px and the root font size scales the page with the viewport (capped at 1440 px). Text blocks are placed from mockup measurements (`--x`, `--b` baseline, `--f`, `--l` in `app/globals.css`).
- `components/Sections.tsx`: server-rendered sections (hero, about, partners, footer).
- `components/Interactive.tsx`: services, projects (filters, lightbox), reviews carousel, mobile dock.
- `components/SiteUI.tsx`: service sheet, project lightbox and the 3-step quote form (native `<dialog>`). The form prepares a `mailto:` to info@adp-toiture.ch; there is no backend.
- `components/SiteEffects.tsx`: entrance animation, scroll reveal, scrollbar-aware desktop scale. All motion is off under `prefers-reduced-motion`.
- `lib/data.ts`: services, projects, reviews, partners, contact details.

## Content to replace before launch

- Photos and logos in `public/img` are cut from the design mockup; swap in the originals and a vector logo.
- Reviews, service details and project descriptions are placeholders to confirm with ADP.
