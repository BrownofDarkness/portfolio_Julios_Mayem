# Portfolio — Julios Mayem

Portfolio personnel de **Julios Mayem Yota Tamessuing**, ingénieur logiciel
orienté intelligence artificielle et vision par ordinateur, Yaoundé, Cameroun.

## Stack

- **Framework** : Next.js 15 (App Router) + TypeScript + React 19
- **Contenu** : MDX + Content Collections typées (Zod)
- **Styles** : CSS pur avec `tokens.css` + PostCSS (nesting, custom-media)
- **i18n** : `next-intl` — URLs par langue `/fr/*` et `/en/*`
- **Animations** : GSAP (core + ScrollTrigger) + View Transitions API
- **Contact** : Resend (API route serveur, template HTML)
- **SEO** : JSON-LD (Person + SoftwareSourceCode), robots.ts, sitemap.ts, llms.txt
- **Analytics** : Vercel Analytics
- **Hébergement** : Vercel

## Structure

```
.
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # locale layout : fonts + provider + styles
│   │   ├── page.tsx                # home
│   │   ├── contact/                # formulaire contact + canaux
│   │   ├── travail/[slug]/         # case studies MDX
│   │   ├── notes/[slug]/           # notes techniques MDX
│   │   └── distinctions/
│   ├── api/
│   │   ├── contact/route.ts        # validation Zod + envoi Resend
│   │   └── og/route.tsx            # génération OG image dynamique
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── contact/                    # ContactForm (client, états idle/loading/success/error)
│   ├── hero/                       # Hero, HeroIntro (GSAP), HeroPortrait, NowPanel
│   ├── layout/                     # Topbar, TopbarMobile (burger), Footer, LanguageSwitch
│   ├── project/                    # ProjectCard, ProjectsGrid
│   ├── section/                    # SectionHead, NotesTeaser
│   ├── spotlight/
│   │   ├── GlobalGridSpotlight     # grille globale réactive au curseur (sous le hero)
│   │   └── HeroAmbientGrid         # grille hero — animation heartbeat BPM 50
│   └── ui/                         # Button
├── content/
│   ├── projects/{fr,en}/*.mdx
│   └── notes/{fr,en}/*.mdx
├── i18n/
│   ├── routing.ts                  # locales + pathnames
│   ├── navigation.ts               # Link, redirect typés
│   └── request.ts                  # loader messages côté serveur
├── lib/
│   ├── content.ts                  # loader MDX + schémas Zod
│   ├── fonts.ts                    # next/font (Inter + JetBrains Mono)
│   ├── gsap.ts                     # instance GSAP + plugins enregistrés
│   └── jsonld.ts                   # Person schema + SoftwareSourceCode
├── messages/
│   ├── fr.json
│   └── en.json
├── public/
│   └── llms.txt                    # signal AI crawlers
├── styles/
│   ├── tokens.css                  # variables (palette, timings, ease)
│   ├── base.css                    # reset + fondations
│   ├── typography.css              # small caps, chiffres tabulaires
│   └── main.css                    # orchestration
├── middleware.ts
├── next.config.ts
└── .env.local                      # RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
```

## Développer localement

```bash
npm install
cp .env.example .env.local   # puis renseigner RESEND_API_KEY
npm run dev
# → http://localhost:3000 (redirige vers /fr)
```

## Variables d'environnement

| Variable             | Description                                      |
| -------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, OG, sitemap)          |
| `RESEND_API_KEY`     | Clé API Resend (resend.com/api-keys)             |
| `CONTACT_TO_EMAIL`   | Destinataire des messages du formulaire          |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié dans Resend)         |

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
  **réelles** via `font-variant-caps: all-small-caps`.
- **Timings** : durées non-rondes (`168ms`, `237ms`, `413ms`) +
  `cubic-bezier(0.32, 0.72, 0, 1)`. `prefers-reduced-motion` respecté partout.
- **Animations** :
  - `HeroAmbientGrid` — heartbeat BPM 50 (lub + dub), ripple GSAP depuis le centre
  - `GlobalGridSpotlight` — spotlight curseur sous le hero, masque recalculé à chaque route
  - `HeroIntro` — fade-in + slide-up séquencé des éléments `[data-hero-el]`

## Contenu

Chaque projet et note existe en **deux versions** (FR + EN) dans
`content/{projects,notes}/{fr,en}/*.mdx`.

Le frontmatter est validé par un **schéma Zod** (`lib/content.ts`) —
un fichier mal formé bloquera le build.

## Roadmap

- **Phase 0 · Setup** — ✔ terminé
- **Phase 1 · Design system + Home FR** — ✔ terminé
- **Phase 2 · Case studies + Notes** — ✔ terminé
- **Phase 3 · Bilingue EN** — ✔ terminé
- **Phase 4 · Assets & polish** — ✔ terminé
- **Phase 5 · Perf, SEO, a11y, formulaire** — ✔ terminé
- **Phase 6 · Recette & lancement** — en cours

## Contact

**Julios Mayem** — [maesjulios@gmail.com](mailto:maesjulios@gmail.com) — Yaoundé, Cameroun.
