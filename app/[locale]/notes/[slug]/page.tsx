import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getNote, getNotes } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";

import styles from "./note.module.css";

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    const notes = await getNotes(locale);
    for (const n of notes) {
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
  const note = await getNote(locale as Locale, slug);
  if (!note) return {};

  return {
    title: `${note.title} — Julios Mayem`,
    description: note.summary,
    alternates: { canonical: `/${locale}/notes/${slug}` },
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!routing.locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  setRequestLocale(locale);

  const note = await getNote(locale, slug);
  if (!note) notFound();

  const t = await getTranslations();

  return (
    <div className="wrap">
      <nav className={styles.crumb}>
        <Link href="/notes" className={styles.crumbLink}>
          ← {t("nav.notes")}
        </Link>
      </nav>

      <header className={styles.head}>
        <div className={styles.eyebrow}>
          {t("sections.notesTitle")} · <span className={styles.tab}>{note.date}</span>
        </div>
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.summary}>{note.summary}</p>
      </header>

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
    </div>
  );
}
