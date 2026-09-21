import { getTranslations } from "next-intl/server";
import styles from "./NowPanel.module.css";

/**
 * Panneau "Currently" — remplace le placeholder v4.
 * Contenu réel + note manuscrite datée.
 * Le vert du statut est le seul "signal vivant" du hero.
 */
export async function NowPanel() {
  const t = await getTranslations("now");

  const rows = [
    { k: t("rows.role"), v: "Dev · BkSquare" },
    { k: t("rows.location"), v: "Yaoundé, CM" },
    { k: t("rows.focus"), v: "opencv · pipelines", mono: true },
    { k: t("rows.available"), v: "Master 2027" },
    { k: t("rows.updated"), v: "21 sep. 2026", mono: true },
  ];

  return (
    <aside className={styles.panel}>
      <header className={styles.head}>
        <span className={styles.label}>{t("label")}</span>
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          {t("status")}
        </span>
      </header>

      <div className={styles.rows}>
        {rows.map((r) => (
          <div key={r.k} className={styles.row}>
            <span className={styles.k}>{r.k}</span>
            <span
              className={r.mono ? `${styles.v} ${styles.mono}` : styles.v}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.footnote}>
        <span className={styles.ts}>Yaoundé — 21 sep. 2026</span>
        {t("footnote")}
      </div>
    </aside>
  );
}
