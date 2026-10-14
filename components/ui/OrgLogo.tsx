import Image from "next/image";
import styles from "./OrgLogo.module.css";

/**
 * Logo d'une structure (entreprise, établissement) sur une tuile
 * claire : les logos fournis ont un fond blanc, illisibles posés
 * directement sur le fond OLED. Décoratif — le nom de la structure
 * est toujours écrit à côté.
 */
export function OrgLogo({ src }: { src: string }) {
  return (
    <span className={styles.tile}>
      <Image src={src} alt="" width={96} height={40} className={styles.img} />
    </span>
  );
}
