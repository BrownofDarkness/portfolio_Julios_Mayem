# Portfolio — Julios Mayem

Portfolio personnel de **Julios Mayem Yota Tamessuing**, ingénieur logiciel
orienté intelligence artificielle et vision par ordinateur, Yaoundé, Cameroun.

## Stack

- **Framework** : Next.js 16 (App Router) + TypeScript + React 19
- **Contenu** : MDX + Content Collections typées (Zod)
- **Styles** : CSS pur avec `tokens.css` + PostCSS (nesting, custom-media)
- **i18n** : `next-intl` — URLs par langue `/fr/*` et `/en/*`
- **Animations** : GSAP (core + ScrollTrigger) + View Transitions API
- **Contact** : Resend (API route serveur)
- **Analytics** : Vercel Analytics
- **Hébergement** : Vercel

## Structure

```
.
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # locale layout : fonts + provider + styles
│   │   ├── page.tsx          # home
│   │   ├── travail/          # /fr/travail — /en/work (via pathnames)
│   │   ├── notes/
│   │   ├── contact/
│   │   └── not-found.tsx
│   └── layout.tsx            # root layout (minimal)
├── content/
│   ├── projects/{fr,en}/*.mdx
│   └── notes/{fr,en}/*.mdx
├── components/                # (à venir en Phase 1)
├── i18n/
│   ├── routing.ts             # locales + pathnames
│   ├── navigation.ts          # Link, redirect typés
│   └── request.ts             # loader messages côté serveur
├── lib/
│   ├── content.ts             # loader MDX + schémas Zod
│   └── fonts.ts               # next/font (Inter + JetBrains Mono)
├── messages/
│   ├── fr.json
│   └── en.json
├── styles/
│   ├── tokens.css             # variables (palette, timings, ease)
│   ├── base.css               # reset + fondations
│   ├── typography.css         # small caps, chiffres tabulaires, letter-spacing
│   └── main.css               # orchestration
├── middleware.ts              # next-intl middleware
├── next.config.ts             # MDX + next-intl plugins
├── postcss.config.mjs
└── tsconfig.json
```

## Développer localement

```bash
npm install
npm run dev
# → http://localhost:3000 (redirige vers /fr)
```

## Scripts

| Commande            | Effet                                     |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Démarre le serveur de dev (Turbopack)     |
| `npm run build`     | Build de production                       |
| `npm run start`     | Sert le build (après `build`)             |
| `npm run lint`      | ESLint                                    |
| `npm run typecheck` | Vérification TypeScript sans émission     |

## Design system — les non-négociables

- **Palette** : `#08090B` ardoise OLED + `#5A9BD8` bleu + `#4EBFC9` cyan +
  `#C9A961` or (distinctions uniquement).
- **Typographie** : Inter (corps, titres) + JetBrains Mono (métadonnées, tags).
  Chiffres old-style dans le corps, tabulaires dans les données. Small caps
  **réelles** via `font-variant-caps: all-small-caps`, jamais
  `text-transform: uppercase`. Letter-spacing progressif selon la taille.
- **Timings** : durées non-rondes (`168ms`, `237ms`, `413ms`) +
  `cubic-bezier(0.32, 0.72, 0, 1)`. `prefers-reduced-motion` respecté partout.
- **Anti-clichés** : jamais de fade-in au scroll universel, jamais de tags
  stack en puces mono dans le hero, jamais de badges vides (`Live`,
  `Case study`) — toujours du contenu réel (`Mémoire 19/20`, `Client · Yaoundé`).

## Contenu

Chaque projet et note existe en **deux versions** (FR + EN) dans
`content/{projects,notes}/{fr,en}/*.mdx`.

Le frontmatter est validé par un **schéma Zod** (`lib/content.ts`) —
un fichier mal formé bloquera le build.

## Roadmap

- **Phase 0 · Setup** — ✔ terminé
- **Phase 1 · Design system + Home FR** — en cours
- **Phase 2 · Case studies + Notes**
- **Phase 3 · Bilingue EN**
- **Phase 4 · Assets & polish**
- **Phase 5 · Perf, SEO, a11y**
- **Phase 6 · Recette & lancement**

## Contact

**Julios Mayem** — [maesjulios@gmail.com](mailto:maesjulios@gmail.com) — Yaoundé, Cameroun.
