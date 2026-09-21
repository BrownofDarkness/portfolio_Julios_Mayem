import { getTranslations } from "next-intl/server";
import { Socials } from "@/components/socials/Socials";
import styles from "./Footer.module.css";

/**
 * Footer enrichi : bloc contact (email + phones) à gauche,
 * bloc socials (logos SVG) au centre, location + build info à droite.
 */
export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className={styles.foot} id="contact-footer">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.contact}>
            <div className={styles.label}>{t("contact")}</div>
            <a href="mailto:maesjulios@gmail.com" className={styles.email}>
              maesjulios@gmail.com
            </a>
            <ul className={styles.phones}>
              <li>
                <a href="tel:+237678542195" className={styles.phone}>
                  <span className={styles.phoneKey}>tel</span>
                  <span className={styles.phoneVal}>+237 678 54 21 95</span>
                </a>
              </li>
              <li>
                <a href="tel:+237656788959" className={styles.phone}>
                  <span className={styles.phoneKey}>tel</span>
                  <span className={styles.phoneVal}>+237 656 78 89 59</span>
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.socials}>
            <div className={styles.label}>{t("networks")}</div>
            <Socials />
          </div>

          <div className={styles.location}>
            <div className={styles.label}>{t("location")}</div>
            <div className={styles.locValue}>Yaoundé, Cameroun</div>
            <div className={styles.build}>
              v1.0.0 · build&nbsp;
              <span className={styles.tab}>2026.09</span>
              <br />
              <span className={styles.live}>●</span> online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
