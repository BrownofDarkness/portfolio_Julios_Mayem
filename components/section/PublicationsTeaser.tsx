import { getTranslations } from "next-intl/server";
import { getPublications } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { publicationKindLabel, publicationDateLabel } from "@/lib/publications";
import styles from "./PublicationsTeaser.module.css";

/**
 * Teaser Publications : liste sobre (type en mono, titre, date ou
 * statut à droite). Chaque ligne mène à la publication.
 */
export async function PublicationsTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const publications = await getPublications(locale);

  return (
    <div className={styles.panel}>
      <p className={styles.subtitle}>{t("sections.publicationsSubtitle")}</p>
      <ul className={styles.list}>
        {publications.map((p) => (
          <li key={p.slug} className={styles.row}>
            <Link
              href={{ pathname: "/publications/[slug]", params: { slug: p.slug } }}
              className={styles.item}
            >
              <span className={styles.main}>
                <span className={styles.kind}>{publicationKindLabel(p.kind, locale)}</span>
                <span className={styles.title}>{p.title}</span>
              </span>
              <span className={styles.date}>{publicationDateLabel(p, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
