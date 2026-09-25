import type { MetadataRoute } from "next";
import { getProjects, getNotes } from "@/lib/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.julios.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectsFr, projectsEn, notesFr, notesEn] = await Promise.all([
    getProjects("fr"),
    getProjects("en"),
    getNotes("fr"),
    getNotes("en"),
  ]);

  const now = new Date();

  // ── Pages statiques ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/fr`,         lastModified: now, alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } } },
    { url: `${BASE}/en`,         lastModified: now, alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } } },
    { url: `${BASE}/fr/contact`, lastModified: now, alternates: { languages: { fr: `${BASE}/fr/contact`, en: `${BASE}/en/contact` } } },
    { url: `${BASE}/en/contact`, lastModified: now, alternates: { languages: { fr: `${BASE}/fr/contact`, en: `${BASE}/en/contact` } } },
    { url: `${BASE}/fr/notes`,   lastModified: now, alternates: { languages: { fr: `${BASE}/fr/notes`,   en: `${BASE}/en/notes` } } },
    { url: `${BASE}/en/notes`,   lastModified: now, alternates: { languages: { fr: `${BASE}/fr/notes`,   en: `${BASE}/en/notes` } } },
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

  // ── Notes ─────────────────────────────────────────────────────
  const noteEntries: MetadataRoute.Sitemap = notesFr
    .filter((n) => n.status === "published")
    .map((n) => ({
      url: `${BASE}/fr/notes/${n.slug}`,
      lastModified: new Date(n.date),
      alternates: {
        languages: {
          fr: `${BASE}/fr/notes/${n.slug}`,
          en: `${BASE}/en/notes/${n.slug}`,
        },
      },
    }));

  // Vérifie que les slugs EN correspondent bien
  const enNoteSet = new Set(notesEn.filter((n) => n.status === "published").map((n) => n.slug));
  const noteEnEntries: MetadataRoute.Sitemap = notesEn
    .filter((n) => n.status === "published" && enNoteSet.has(n.slug))
    .map((n) => ({
      url: `${BASE}/en/notes/${n.slug}`,
      lastModified: new Date(n.date),
      alternates: {
        languages: {
          fr: `${BASE}/fr/notes/${n.slug}`,
          en: `${BASE}/en/notes/${n.slug}`,
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
    ...noteEntries,
    ...noteEnEntries,
  ];
}
