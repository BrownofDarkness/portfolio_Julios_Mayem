import { getTranslations } from "next-intl/server";
import { getNotes } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import styles from "./NotesTeaser.module.css";

/**
 * Teaser Notes techniques : liste sobre des sujets à venir,
 * chaque ligne avec date/status à droite en mono.
 */
export async function NotesTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const notes = await getNotes(locale);

  return (
    <div className={styles.panel}>
      <p className={styles.subtitle}>{t("sections.notesSubtitle")}</p>
      <ul className={styles.list}>
        {notes.map((n) => (
          <li key={n.slug} className={styles.item}>
            <span className={styles.title}>{n.title}</span>
            <span className={styles.date}>
              {n.status === "coming" ? (locale === "fr" ? "bientôt" : "coming soon") : n.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
