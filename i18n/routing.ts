import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/travail/[slug]": {
      fr: "/travail/[slug]",
      en: "/work/[slug]",
    },
    "/notes": {
      fr: "/notes",
      en: "/notes",
    },
    "/notes/[slug]": {
      fr: "/notes/[slug]",
      en: "/notes/[slug]",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
