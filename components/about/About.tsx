import { getTranslations } from "next-intl/server";
import styles from "./About.module.css";

/**
 * Section "À propos" éditoriale — bio en prose (pas de listes),
 * intègre formation + parcours associatif sans en faire un CV.
 * Une signature en fin. Contenu tiré du questionnaire de Julios.
 */
export async function About() {
  const t = await getTranslations("about");

  return (
    <div className={styles.wrap}>
      <div className={styles.body}>
        <p className={styles.p}>{t("p1")}</p>
        <p className={styles.p}>{t("p2")}</p>
        <p className={styles.p}>{t("p3")}</p>

        <div className={styles.signature}>
          <span className={styles.sigLabel}>—</span>
          <span className={styles.sigQuote}>{t("signature")}</span>
        </div>
      </div>

      <aside className={styles.side}>
        <div className={styles.sideBlock}>
          <div className={styles.sideLabel}>{t("side.education")}</div>
          <div className={styles.sideValue}>
            {t("side.eduLine1")}<br />
            <span className={styles.sideMuted}>{t("side.eduLine2")}</span>
          </div>
        </div>
        <div className={styles.sideBlock}>
          <div className={styles.sideLabel}>{t("side.role")}</div>
          <div className={styles.sideValue}>
            {t("side.roleLine1")}<br />
            <span className={styles.sideMuted}>{t("side.roleLine2")}</span>
          </div>
        </div>
        <div className={styles.sideBlock}>
          <div className={styles.sideLabel}>{t("side.languages")}</div>
          <div className={styles.sideValue}>{t("side.languagesValue")}</div>
        </div>
      </aside>
    </div>
  );
}
