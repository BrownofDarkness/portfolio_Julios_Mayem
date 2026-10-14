import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { getPublications } from "@/lib/content";
import { publicationKindLabel, publicationDateLabel } from "@/lib/publications";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/section/SectionHead";

import styles from "./index.module.css";

export default async function PublicationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!routing.locales.includes(raw as Locale)) return null;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations();
  const publications = await getPublications(locale);

  return (
    <div className={`wrap ${styles.wrap}`}>
      <SectionHead
        index="—"
        title={t("sections.publicationsTitle")}
        aside={t("sections.publicationsAside")}
      />

      <ul className={styles.list}>
        {publications.map((n) => (
          <li key={n.slug} className={styles.item}>
            <Link
              href={{ pathname: "/publications/[slug]", params: { slug: n.slug } }}
              className={styles.link}
            >
              <div className={styles.top}>
                <span className={styles.title}>{n.title}</span>
                <span className={styles.date}>
                  {publicationKindLabel(n.kind, locale)} · {publicationDateLabel(n, locale)}
                </span>
              </div>
              <p className={styles.summary}>{n.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
