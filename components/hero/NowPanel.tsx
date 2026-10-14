import { getTranslations } from "next-intl/server";
import { FlagCM } from "@/components/ui/FlagCM";
import styles from "./NowPanel.module.css";

/**
 * Panneau "Currently" — remplace le placeholder v4.
 * Contenu réel + note manuscrite datée.
 * Le vert du statut est le seul "signal vivant" du hero.
 */
export async function NowPanel() {
  const t = await getTranslations("now");

  const rows = [
    { k: t("rows.role"), v: t("values.role") },
    { k: t("rows.location"), v: t("values.location"), flag: true },
    { k: t("rows.focus"), v: t("values.focus"), mono: true },
    { k: t("rows.available"), v: t("values.available") },
    { k: t("rows.updated"), v: t("values.updated"), mono: true },
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
              {r.flag ? <FlagCM /> : null}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.footnote}>
        <span className={styles.ts}>{t("footnoteDate")}</span>
        {t("footnote")}
      </div>
    </aside>
  );
}
