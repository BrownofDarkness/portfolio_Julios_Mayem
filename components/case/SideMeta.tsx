import styles from "./SideMeta.module.css";

export type SideBlock = {
  label: string;
  value: string;
  mono?: boolean;
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
          <div className={b.mono ? `${styles.value} ${styles.mono}` : styles.value}>
            {b.value}
          </div>
        </div>
      ))}
    </aside>
  );
}
