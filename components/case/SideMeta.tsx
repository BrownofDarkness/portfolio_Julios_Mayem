import { OrgLogo } from "@/components/ui/OrgLogo";
import styles from "./SideMeta.module.css";

export type SideBlock = {
  label: string;
  value: string;
  mono?: boolean;
  /** Lien externe (ex. dépôt GitHub) */
  href?: string;
  /** Logo de la structure, affiché au-dessus de la valeur */
  logo?: string;
};

type SideMetaProps = {
  blocks: SideBlock[];
};

/**
 * Panneau vertical sticky à droite du case study.
 * Bordure gauche discrète, labels small caps, valeurs typo neutre
 * ou mono selon la nature (dates, IDs → mono ; texte → neutre).
 */
export function SideMeta({ blocks }: SideMetaProps) {
  return (
    <aside className={styles.side}>
      {blocks.map((b) => (
        <div key={b.label} className={styles.block}>
          <div className={styles.label}>{b.label}</div>
          {b.logo ? <OrgLogo src={b.logo} /> : null}
          <div className={b.mono ? `${styles.value} ${styles.mono}` : styles.value}>
            {b.href ? (
              <a href={b.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {b.value} ↗
              </a>
            ) : (
              b.value
            )}
          </div>
        </div>
      ))}
    </aside>
  );
}
