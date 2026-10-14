import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { routing, type Locale } from "@/i18n/routing";
import { getPublication, getPublications } from "@/lib/content";
import { publicationKindLabel, publicationDateLabel } from "@/lib/publications";
import { mdxComponents } from "@/components/mdx/mdx-components";

import styles from "./publication.module.css";

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    const publications = await getPublications(locale);
    for (const n of publications) {
      params.push({ locale, slug: n.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const note = await getPublication(locale as Locale, slug);
  if (!note) return {};

  const kicker = `${publicationKindLabel(note.kind, locale as Locale)} · ${note.date}`;

  const ogUrl =
    `/api/og?kind=case` +
    `&title=${encodeURIComponent(note.title)}` +
    `&subtitle=${encodeURIComponent(note.summary)}` +
    `&kicker=${encodeURIComponent(kicker)}`;

  return {
    title: `${note.title} — MAYEM YOTA TAMESSUING Julios`,
    description: note.summary,
    alternates: { canonical: `/${locale}/publications/${slug}` },
    // Brouillons non validés : pas d'indexation tant que non publiés.
    ...(note.status !== "published" ? { robots: { index: false } } : {}),
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: note.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.summary,
      images: [ogUrl],
    },
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!routing.locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  setRequestLocale(locale);

  const note = await getPublication(locale, slug);
  if (!note) notFound();

  const t = await getTranslations();

  return (
    <div className="wrap">
      <nav className={styles.crumb}>
        <a href={`/${locale}#publications`} className={styles.crumbLink}>
          ← {t("nav.publications")}
        </a>
      </nav>

      <header className={styles.head}>
        <div className={styles.eyebrow}>
          {publicationKindLabel(note.kind, locale)} ·{" "}
          <span className={styles.tab}>{publicationDateLabel(note, locale)}</span>
        </div>
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.summary}>{note.summary}</p>
      </header>

      {note.status !== "published" ? (
        <p className={styles.pending}>
          {locale === "fr"
            ? "Publication en préparation — revenez bientôt."
            : "Publication in preparation — check back soon."}
        </p>
      ) : (
        <article className={styles.body}>
          <MDXRemote
            source={note.body}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </article>
      )}
    </div>
  );
}
