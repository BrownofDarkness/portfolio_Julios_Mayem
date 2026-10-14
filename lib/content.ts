import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "@/i18n/routing";

/* =============================================================
   Content Collections — schéma typé + loader MDX.
   Deux collections : projects, publications.
   Chaque locale a son propre dossier (content/{kind}/{locale}/*.mdx).
   ============================================================= */

/* ---------- Schémas Zod ---------- */

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.number().int(),
  status: z.enum(["memoire", "production", "client", "prototype", "livre", "archive"]),
  client: z.string().optional(),
  /** Rôle personnel sur le projet (sinon libellé générique) */
  role: z.string().optional(),
  summary: z.string(),
  /** Dépôt public — ou privateCode: true pour un projet confidentiel */
  repo: z.string().url().optional(),
  privateCode: z.boolean().default(false),
  stack: z.array(z.string()).default([]),
  badges: z
    .array(
      z.object({
        label: z.string(),
        variant: z.enum(["gold", "cyan", "muted"]).default("muted"),
      })
    )
    .default([]),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .default([]),
  wide: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const publicationSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  summary: z.string(),
  /** article · retour d'expérience · note de veille · recherche appliquée */
  kind: z.enum(["article", "experience", "watch", "research"]).default("article"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "coming"]).default("draft"),
});

export type ProjectMeta = z.infer<typeof projectSchema>;
export type PublicationMeta = z.infer<typeof publicationSchema>;

/* ---------- Chemins ---------- */

const CONTENT_ROOT = path.join(process.cwd(), "content");

function contentDir(kind: "projects" | "publications", locale: Locale) {
  return path.join(CONTENT_ROOT, kind, locale);
}

/* ---------- Loader générique ---------- */

async function readCollection<S extends z.ZodTypeAny>(
  dir: string,
  schema: S
): Promise<Array<z.output<S> & { body: string }>> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const files = entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const parsed = schema.parse(data) as z.output<S>;
      return { ...parsed, body: content };
    })
  );

  return items;
}

/* ---------- API publique ---------- */

export async function getProjects(locale: Locale) {
  const items = await readCollection(contentDir("projects", locale), projectSchema);
  return items.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || b.year - a.year
  );
}

export async function getProject(locale: Locale, slug: string) {
  const items = await getProjects(locale);
  return items.find((p) => p.slug === slug);
}

export async function getPublications(locale: Locale) {
  const items = await readCollection(contentDir("publications", locale), publicationSchema);
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPublication(locale: Locale, slug: string) {
  const items = await getPublications(locale);
  return items.find((n) => n.slug === slug);
}
