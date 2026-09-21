import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { getNotes } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/section/SectionHead";

import styles from "./index.module.css";

export default async function NotesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!routing.locales.includes(raw as Locale)) return null;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations();
  const notes = await getNotes(locale);

  return (
    <div className={`wrap ${styles.wrap}`}>
      <SectionHead
        index="—"
        title={t("sections.notesTitle")}
        aside={t("sections.notesAside")}
      />

      <ul className={styles.list}>
        {notes.map((n) => (
          <li key={n.slug} className={styles.item}>
            <Link
              href={{ pathname: "/notes/[slug]", params: { slug: n.slug } }}
              className={styles.link}
            >
              <div className={styles.top}>
                <span className={styles.title}>{n.title}</span>
                <span className={styles.date}>
                  {n.status === "coming"
                    ? (locale === "fr" ? "bientôt" : "coming soon")
                    : n.date}
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
