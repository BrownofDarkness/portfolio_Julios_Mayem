# Portfolio — Julios Mayem

Portfolio personnel de **Julios Mayem Yota Tamessuing**, ingénieur logiciel
orienté intelligence artificielle et vision par ordinateur, Yaoundé, Cameroun.

**En ligne** : [me-julios.vercel.app](https://me-julios.vercel.app/)

## Stack

- **Framework** : Next.js 16 (App Router) + TypeScript + React 19
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
│   │   ├── page.tsx                # home (hero, projets, à propos, compétences, publications)
│   │   ├── not-found.tsx
│   │   ├── contact/                # formulaire contact + canaux
│   │   ├── travail/[slug]/         # case studies MDX
│   │   └── publications/           # index + publications MDX ([slug])
│   ├── api/
│   │   ├── contact/route.ts        # validation Zod + envoi Resend
│   │   └── og/route.tsx            # génération OG image dynamique
│   ├── icon.svg                    # favicon statique (J + trait cyan)
│   ├── apple-icon.tsx
│   ├── manifest.ts
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── about/                      # About
│   ├── case/                       # CaseHeader, SideMeta (pages case study)
│   ├── contact/                    # ContactForm (client, états idle/loading/success/error)
│   ├── hero/                       # Hero, HeroIntro (GSAP), HeroPortrait, NowPanel
│   ├── layout/                     # Topbar, TopbarMobile (burger), Footer, LanguageSwitch
│   ├── mdx/                        # Figure, Callout + mapping des composants MDX
│   ├── project/                    # ProjectCard, ProjectsGrid
│   ├── section/                    # SectionHead, PublicationsTeaser
│   ├── skills/                     # Skills
│   ├── socials/                    # Socials (logos, footer + contact)
│   ├── spotlight/
│   │   ├── GlobalGridSpotlight     # grille globale réactive au curseur (sous le hero)
│   │   └── HeroAmbientGrid         # grille hero — battement toutes les 12 s
│   ├── ui/                         # Button, FlagCM (drapeau SVG), OrgLogo (logo de structure)
│   └── JsonLd.tsx
├── content/
│   ├── projects/{fr,en}/*.mdx
│   └── publications/{fr,en}/*.mdx
├── i18n/
│   ├── routing.ts                  # locales + pathnames
│   ├── navigation.ts               # Link, redirect typés
│   └── request.ts                  # loader messages côté serveur
├── lib/
│   ├── content.ts                  # loader MDX + schémas Zod
│   ├── fonts.ts                    # next/font (Inter + JetBrains Mono)
│   ├── gsap.ts                     # instance GSAP + plugins enregistrés
│   ├── jsonld.ts                   # Person schema + SoftwareSourceCode
│   ├── publications.ts             # libellés type / date des publications
│   └── site.ts                     # SITE_URL, nom complet (SEO)
├── messages/
│   ├── fr.json
│   └── en.json
├── public/
│   ├── llms.txt                    # signal AI crawlers
│   ├── portrait.png
│   ├── logos/                      # logos des structures (BkSquare, IUSTE, AfriShape)
│   └── projects/                   # visuels des projets + schémas SVG (pipeline, MLD)
├── styles/
│   ├── tokens.css                  # variables (palette, timings, ease)
│   ├── base.css                    # reset + fondations
│   ├── typography.css              # small caps, chiffres tabulaires
│   └── main.css                    # orchestration
├── proxy.ts                        # middleware next-intl (convention Next 16)
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
  `#C9A961` or (touches rares : badge mémoire, signature).
- **Typographie** : deux familles seulement, Inter (corps, titres) + JetBrains
  Mono (métadonnées, tags). Tailles uniquement via l'échelle `--fs-*` de
  `tokens.css` (jamais de `font-size` en dur). Paragraphes longs justifiés
  sur desktop, alignés à gauche sur mobile.
  Chiffres old-style dans le corps, tabulaires dans les données. Small caps
  **réelles** via `font-variant-caps: all-small-caps`.
- **Timings** : durées non-rondes (`168ms`, `237ms`, `413ms`) +
  `cubic-bezier(0.32, 0.72, 0, 1)`. `prefers-reduced-motion` respecté partout.
- **Animations** :
  - `HeroAmbientGrid` — battement (lub + dub) toutes les 12 s, ripple GSAP depuis le centre
  - `GlobalGridSpotlight` — spotlight curseur sous le hero, masque recalculé à chaque route
    (pas de battement : il reste propre au hero)
  - `HeroIntro` — fade-in + slide-up séquencé des éléments `[data-hero-el]`

## Contenu

Chaque projet et publication existe en **deux versions** (FR + EN) dans
`content/{projects,publications}/{fr,en}/*.mdx`.

Le frontmatter est validé par un **schéma Zod** (`lib/content.ts`) —
un fichier mal formé bloquera le build.

- **Projets** : `repo` (URL GitHub) ou `privateCode: true` (affiche « Code non
  public — démo sur demande ») ; `role` pour préciser le rôle personnel ;
  `site` (lien vers le projet en ligne) ; `logo` (logo de la structure, dans
  le bloc contexte). Ne publier que des chiffres documentés.
  Une `<Figure>` sans `src` n'est affichée qu'en développement.
- **Publications** : `kind` (`article`, `experience`, `watch`, `research`) et
  `status`. Tant que `status` ≠ `published`, la page affiche « en préparation »
  et n'est ni indexée ni listée dans le sitemap. Les anciennes URL `/notes/*`
  redirigent vers `/publications/*`.

## Roadmap

- **Phase 0 · Setup** — ✔ terminé
- **Phase 1 · Design system + Home FR** — ✔ terminé
- **Phase 2 · Case studies + Notes** — ✔ terminé
- **Phase 3 · Bilingue EN** — ✔ terminé
- **Phase 4 · Assets & polish** — ✔ terminé
- **Phase 5 · Perf, SEO, a11y, formulaire** — ✔ terminé
- **Phase 6 · Recette & lancement** — ✔ terminé — en ligne sur
  [me-julios.vercel.app](https://me-julios.vercel.app/)

- **Phase 7 · Corrections Julios (oct. 2026)** — en cours : textes, SEO nom
  complet, publications, typographie, animations ; en attente des schémas,
  logos et liens GitHub

## Contact

**MAYEM YOTA TAMESSUING Julios** — [maesjulios@gmail.com](mailto:maesjulios@gmail.com) — Yaoundé, Cameroun.
