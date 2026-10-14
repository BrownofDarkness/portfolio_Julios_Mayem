import type { MetadataRoute } from "next";
import { getProjects, getPublications } from "@/lib/content";

import { SITE_URL as BASE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectsFr, projectsEn, publicationsFr, publicationsEn] = await Promise.all([
    getProjects("fr"),
    getProjects("en"),
    getPublications("fr"),
    getPublications("en"),
  ]);

  const now = new Date();

  // ── Pages statiques ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/fr`,         lastModified: now, alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } } },
    { url: `${BASE}/en`,         lastModified: now, alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } } },
    { url: `${BASE}/fr/contact`, lastModified: now, alternates: { languages: { fr: `${BASE}/fr/contact`, en: `${BASE}/en/contact` } } },
    { url: `${BASE}/en/contact`, lastModified: now, alternates: { languages: { fr: `${BASE}/fr/contact`, en: `${BASE}/en/contact` } } },
    { url: `${BASE}/fr/publications`,   lastModified: now, alternates: { languages: { fr: `${BASE}/fr/publications`,   en: `${BASE}/en/publications` } } },
    { url: `${BASE}/en/publications`,   lastModified: now, alternates: { languages: { fr: `${BASE}/fr/publications`,   en: `${BASE}/en/publications` } } },
  ];

  // ── Projets ───────────────────────────────────────────────────
  const projectEntries: MetadataRoute.Sitemap = projectsFr.map((p) => ({
    url: `${BASE}/fr/travail/${p.slug}`,
    lastModified: now,
    alternates: {
      languages: {
        fr: `${BASE}/fr/travail/${p.slug}`,
        en: `${BASE}/en/work/${p.slug}`,
      },
    },
  }));

  // ── Publications ─────────────────────────────────────────────────────
  const publicationEntries: MetadataRoute.Sitemap = publicationsFr
    .filter((n) => n.status === "published")
    .map((n) => ({
      url: `${BASE}/fr/publications/${n.slug}`,
      lastModified: new Date(n.date),
      alternates: {
        languages: {
          fr: `${BASE}/fr/publications/${n.slug}`,
          en: `${BASE}/en/publications/${n.slug}`,
        },
      },
    }));

  // Vérifie que les slugs EN correspondent bien
  const enPublicationSet = new Set(publicationsEn.filter((n) => n.status === "published").map((n) => n.slug));
  const publicationEnEntries: MetadataRoute.Sitemap = publicationsEn
    .filter((n) => n.status === "published" && enPublicationSet.has(n.slug))
    .map((n) => ({
      url: `${BASE}/en/publications/${n.slug}`,
      lastModified: new Date(n.date),
      alternates: {
        languages: {
          fr: `${BASE}/fr/publications/${n.slug}`,
          en: `${BASE}/en/publications/${n.slug}`,
        },
      },
    }));

  const enProjectEntries: MetadataRoute.Sitemap = projectsEn.map((p) => ({
    url: `${BASE}/en/work/${p.slug}`,
    lastModified: now,
    alternates: {
      languages: {
        fr: `${BASE}/fr/travail/${p.slug}`,
        en: `${BASE}/en/work/${p.slug}`,
      },
    },
  }));

  return [
    ...staticPages,
    ...projectEntries,
    ...enProjectEntries,
    ...publicationEntries,
    ...publicationEnEntries,
  ];
}
