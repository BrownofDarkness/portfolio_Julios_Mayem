import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  /** "01." — affiché en mono très discret devant le titre */
  index?: string;
  /** Le titre de section */
  title: ReactNode;
  /** Aside à droite (compteur, période, tag) — optionnel */
  aside?: ReactNode;
};

/**
 * Header cohérent pour chaque bloc du site.
 * L'index numérique est en mono discret, le titre en sans-serif,
 * l'aside à droite en small caps mono.
 */
export function SectionHead({ index, title, aside }: SectionHeadProps) {
  return (
    <header className={styles.head}>
      <h2 className={styles.title}>
        {index ? <span className={styles.num}>{index}</span> : null}
        {title}
      </h2>
      {aside ? <span className={styles.aside}>{aside}</span> : null}
    </header>
  );
}
