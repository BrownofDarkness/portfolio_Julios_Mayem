import Image from "next/image";
import styles from "./HeroPortrait.module.css";

export function HeroPortrait() {
  return (
    <figure className={styles.wrap} aria-label="Portrait de Julios Mayem">
      <Image
        src="/portrait.png"
        alt="Julios Mayem — Développeur logiciel, Yaoundé, Cameroun"
        fill
        priority
        className={styles.img}
        sizes="(max-width: 780px) calc(100vw - 3rem), 320px"
      />
    </figure>
  );
}
