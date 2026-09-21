import type { ProjectMeta } from "@/lib/content";
import styles from "./CaseHeader.module.css";

type CaseHeaderProps = {
  project: ProjectMeta;
  /** "Étude de cas · 2024" — préfixe éditorial */
  eyebrow: string;
};

/**
 * Header du case study : eyebrow → titre du projet → badges → métriques.
 * La tagline (H1 dans le corps MDX) suit ensuite en dessous.
 */
export function CaseHeader({ project, eyebrow }: CaseHeaderProps) {
  const badges = project.badges ?? [];
  const metrics = project.metrics ?? [];

  return (
    <header className={styles.head}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1 className={styles.title}>{project.title}</h1>

      {badges.length > 0 ? (
        <div className={styles.badges}>
          {badges.map((b, i) => (
            <span
              key={i}
              className={`${styles.badge} ${styles[`badge_${b.variant}`]}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      ) : null}

      {metrics.length > 0 ? (
        <div className={styles.metrics}>
          {metrics.map((m, i) => (
            <div key={i} className={styles.metric}>
              <span className={styles.metricVal}>{m.value}</span>
              <span className={styles.metricLab}>{m.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}
