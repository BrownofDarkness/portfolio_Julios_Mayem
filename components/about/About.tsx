import { getTranslations } from "next-intl/server";
import { OrgLogo } from "@/components/ui/OrgLogo";
import styles from "./About.module.css";

type EducationStep = {
  level: string;
  year: string;
  title: string;
  school: string;
  detail: string;
  logo?: string;
};

/**
 * Section "À propos" éditoriale — bio en prose (pas de listes),
 * intègre formation + parcours associatif sans en faire un CV.
 * Le parcours académique (L1 → L3) est détaillé dans la colonne latérale.
 * Une signature en fin. Contenu tiré du questionnaire de Julios.
 */
export async function About() {
  const t = await getTranslations("about");
  const education = t.raw("education") as EducationStep[];

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
          <ol className={styles.timeline}>
            {education.map((step) => (
              <li key={step.level} className={styles.step}>
                {step.logo ? <OrgLogo src={step.logo} /> : null}
                <span className={styles.stepLevel}>
                  {step.level} · {step.year}
                </span>
                <span className={styles.sideValue}>{step.title}</span>
                <span className={styles.sideMuted}>
                  {step.school} — {step.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.sideBlock}>
          <div className={styles.sideLabel}>{t("side.role")}</div>
          <OrgLogo src="/logos/bksquare.png" />
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
