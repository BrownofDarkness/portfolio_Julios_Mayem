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
    "/publications": {
      fr: "/publications",
      en: "/publications",
    },
    "/publications/[slug]": {
      fr: "/publications/[slug]",
      en: "/publications/[slug]",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
