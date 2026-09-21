import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
};

/**
 * Button — rendu en <a> (utilisé comme lien ou CTA).
 * Variantes : primary (fond bleu, contraste fort) · ghost (bordure discrète).
 * Le paramètre `arrow` ajoute une flèche mono qui se décale au hover.
 */
export function Button({
  variant = "primary",
  arrow = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <a
      {...rest}
      className={[
        styles.btn,
        variant === "primary" ? styles.primary : styles.ghost,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.label}>{children}</span>
      {arrow ? <span className={styles.arrow}>→</span> : null}
    </a>
  );
}
