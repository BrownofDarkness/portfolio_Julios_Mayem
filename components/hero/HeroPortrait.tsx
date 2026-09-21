import styles from "./HeroPortrait.module.css";

/**
 * Placeholder du portrait — sera remplacé par une <Image /> next/image
 * quand on aura la photo de Julios (Phase 4).
 * Les repères mono (portrait · 4:5, ~800×1000) sont volontairement
 * conservés en dev pour montrer l'intention.
 */
export function HeroPortrait() {
  return (
    <figure className={styles.wrap} aria-label="Portrait de Julios Mayem">
      <span className={styles.corner} data-pos="tl">
        portrait · 4:5
      </span>
      <span className={styles.corner} data-pos="br">
        ≈ 800 × 1000 px
      </span>
      <div className={styles.label}>
        <div className={styles.icon}>◐</div>
        <div className={styles.title}>Photo de Julios</div>
        <div className={styles.note}>
          Portrait sobre — fond neutre, lumière douce, contraste soutenu.
          Léger grain, désaturation minimale.
        </div>
      </div>
    </figure>
  );
}
