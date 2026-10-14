import Image from "next/image";
import styles from "./HeroPortrait.module.css";

export function HeroPortrait() {
  return (
    <figure className={styles.wrap}>
      <Image
        src="/portrait.png"
        alt="Portrait de MAYEM YOTA TAMESSUING Julios, développeur logiciel à Yaoundé, Cameroun"
        fill
        priority
        className={styles.img}
        sizes="(max-width: 780px) calc(100vw - 3rem), 320px"
      />
    </figure>
  );
}
