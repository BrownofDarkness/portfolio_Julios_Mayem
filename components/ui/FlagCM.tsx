import styles from "./FlagCM.module.css";

/**
 * Drapeau du Cameroun en SVG inline — l'emoji 🇨🇲 ne s'affiche pas
 * sous Windows (on y verrait « CM »). Décoratif : il accompagne
 * toujours le mot « Cameroun », qui reste le texte lu par Google.
 */
export function FlagCM({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 6"
      className={`${styles.flag} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="3" height="6" fill="#007A5E" />
      <rect x="3" width="3" height="6" fill="#CE1126" />
      <rect x="6" width="3" height="6" fill="#FCD116" />
      <polygon
        fill="#FCD116"
        points="4.500,2.000 4.725,2.691 5.451,2.691 4.863,3.118 5.088,3.809 4.500,3.382 3.912,3.809 4.137,3.118 3.549,2.691 4.275,2.691"
      />
    </svg>
  );
}
