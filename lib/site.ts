/** URL publique du site (canonical, OG, sitemap, JSON-LD). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-julios.vercel.app"
).replace(/\/$/, "");

export const SITE_HOST = new URL(SITE_URL).host;

/** Nom complet, tel qu'il doit apparaître pour le référencement. */
export const FULL_NAME = "MAYEM YOTA TAMESSUING Julios";
