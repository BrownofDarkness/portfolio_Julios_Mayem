import type { ReactNode } from "react";
import styles from "./Figure.module.css";

type FigureProps = {
  /** hero = 16:9 large · inline = 3:2 · portrait = 4:5 */
  ratio?: "hero" | "inline" | "portrait";
  /** Numérotation Fig. 01 · 02 · etc. — pour la caption */
  num?: string;
  /** Légende éditoriale sous l'image */
  caption?: ReactNode;
  /** Description de l'image à insérer (visible en placeholder) */
  children?: ReactNode;
  /** Dimensions repère (dev only, sera retiré quand la photo arrive) */
  dims?: string;
};

/**
 * Figure — placeholder pour les visuels des case studies.
 * Quand l'image réelle arrivera (Phase 4), on remplacera le
 * contenu par une balise <Image /> next/image.
 */
export function Figure({
  ratio = "inline",
  num,
  caption,
  children,
  dims,
}: FigureProps) {
  const ratioClass =
    ratio === "hero" ? styles.ratioHero
    : ratio === "portrait" ? styles.ratioPortrait
    : styles.ratioInline;

  return (
    <>
      <figure className={`${styles.wrap} ${ratioClass}`}>
        {num ? (
          <span className={styles.cornerTl}>fig. {num} · {ratio === "hero" ? "16:9" : ratio === "portrait" ? "4:5" : "3:2"}</span>
        ) : null}
        {dims ? <span className={styles.cornerBr}>{dims}</span> : null}
        <div className={styles.label}>
          <div className={styles.icon}>▦</div>
          <div className={styles.title}>Visuel à insérer</div>
          <div className={styles.note}>{children}</div>
        </div>
      </figure>
      {caption ? (
        <div className={styles.caption}>
          {num ? <b>Fig. {num}</b> : null}
          {num ? <span> — </span> : null}
          {caption}
        </div>
      ) : null}
    </>
  );
}
