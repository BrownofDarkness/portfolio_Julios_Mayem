import type { ProjectMeta } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: ProjectMeta;
};

/**
 * Une carte projet dense : badges signifiants (jamais génériques),
 * titre + année, description en prose, tags stack, deux métriques
 * clés en tabular-nums. Le survol lève d'1 px et surligne le titre.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const badges = project.badges ?? [];
  const stack = project.stack ?? [];
  const metrics = project.metrics ?? [];
  const isWide = project.wide;

  return (
    <Link
      href={{ pathname: "/travail/[slug]", params: { slug: project.slug } }}
      className={`${styles.card} ${isWide ? styles.wide : ""}`}
    >
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

      <h3 className={styles.title}>{project.title}</h3>

      <p className={styles.desc}>{project.summary}</p>

      {stack.length > 0 ? (
        <div className={styles.tags}>
          {stack.map((s) => (
            <span key={s}>{s}</span>
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

      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
