import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { routing, type Locale } from "@/i18n/routing";
import { getProject, getProjects } from "@/lib/content";
import { CaseHeader } from "@/components/case/CaseHeader";
import { SideMeta, type SideBlock } from "@/components/case/SideMeta";
import { mdxComponents } from "@/components/mdx/mdx-components";

import styles from "./case.module.css";

/**
 * Génère les paires (locale, slug) pour la génération statique.
 * Prend l'union des slugs de toutes les locales — un projet peut
 * exister dans une seule langue temporairement.
 */
export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    const projects = await getProjects(locale);
    for (const p of projects) {
      params.push({ locale, slug: p.slug });
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
  const project = await getProject(locale as Locale, slug);
  if (!project) return {};

  const kicker =
    locale === "fr"
      ? `Étude de cas · ${project.year}`
      : `Case study · ${project.year}`;

  const ogUrl =
    `/api/og?kind=case` +
    `&title=${encodeURIComponent(project.title)}` +
    `&subtitle=${encodeURIComponent(project.summary)}` +
    `&kicker=${encodeURIComponent(kicker)}`;

  return {
    title: `${project.title} — Julios Mayem`,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/${locale === "fr" ? "travail" : "work"}/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [ogUrl],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!routing.locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  setRequestLocale(locale);

  const project = await getProject(locale, slug);
  if (!project) notFound();

  const t = await getTranslations();

  const eyebrow = `${t("sections.caseStudyTitle")} · ${project.year}`;

  const sideBlocks: SideBlock[] = [
    {
      label: locale === "fr" ? "rôle" : "role",
      value:
        locale === "fr"
          ? "Conception, modélisation, développement."
          : "Design, modelling, implementation.",
    },
    {
      label: locale === "fr" ? "contexte" : "context",
      value: project.client ?? "—",
    },
    {
      label: "stack",
      value: project.stack.join(" · "),
      mono: true,
    },
    {
      label: locale === "fr" ? "période" : "period",
      value: String(project.year),
      mono: true,
    },
  ];

  return (
    <div className="wrap">
      <nav className={styles.crumb}>
        <a href={`/${locale}#travail`} className={styles.crumbLink}>
          ← {t("nav.work")}
        </a>
      </nav>

      <CaseHeader project={project} eyebrow={eyebrow} />

      <div className={styles.grid}>
        <article className={styles.body}>
          <MDXRemote
            source={project.body}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </article>

        <SideMeta blocks={sideBlocks} />
      </div>
    </div>
  );
}
