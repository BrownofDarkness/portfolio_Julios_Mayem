import styles from "./Distinction.module.css";

export type DistinctionData = {
  label: string;
  title: string;
  year: string;
  issuer: string;
};

/**
 * Une carte "distinction" avec bordure gauche or.
 * L'or ne vit QU'ici et dans les badges de mémoire.
 */
export function Distinction({ item }: { item: DistinctionData }) {
  return (
    <article className={styles.card}>
      <div className={styles.label}>{item.label}</div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.meta}>
        <span className={styles.tab}>{item.year}</span> · {item.issuer}
      </div>
    </article>
  );
}

export function DistinctionsGrid({ items }: { items: DistinctionData[] }) {
  return (
    <div className={styles.grid}>
      {items.map((it, i) => (
        <Distinction key={i} item={it} />
      ))}
    </div>
  );
}
