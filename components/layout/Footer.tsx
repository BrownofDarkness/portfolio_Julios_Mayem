import { getTranslations } from "next-intl/server";
import styles from "./Footer.module.css";

/**
 * Footer sobre — deux colonnes (contact + build info).
 * Le petit "● online" est purement décoratif ; on garde le vert
 * réservé exclusivement à ce signal.
 */
export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className={styles.foot} id="contact">
      <div className="wrap">
        <div className={styles.row}>
          <div className={styles.contact}>
            <a href="mailto:maesjulios@gmail.com" className={styles.email}>
              maesjulios@gmail.com
            </a>
            <span className={styles.sep}>·</span>
            <span className={styles.location}>{t("location")}</span>
          </div>
          <div className={styles.build}>
            v1.0.0 · build&nbsp;
            <span className={styles.tab}>2026.09</span> ·{" "}
            <span className={styles.live} aria-hidden="true">
              ●
            </span>{" "}
            online
          </div>
        </div>
      </div>
    </footer>
  );
}
