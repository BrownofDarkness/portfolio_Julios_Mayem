import type { ReactNode } from "react";
import styles from "./Callout.module.css";

type CalloutProps = {
  /** note (bleu) · quote (or) · insight (cyan) */
  kind?: "note" | "quote" | "insight";
  /** Label court affiché en small caps en haut */
  label?: string;
  children: ReactNode;
};

/**
 * Callout — petit encart éditorial pour attirer l'attention.
 * "quote" pour les phrases signature, "insight" pour les prises
 * de recul techniques, "note" pour les précisions contextuelles.
 */
export function Callout({ kind = "note", label, children }: CalloutProps) {
  return (
    <aside className={`${styles.wrap} ${styles[kind]}`}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
