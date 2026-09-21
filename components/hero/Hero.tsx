import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { GridSpotlight } from "./GridSpotlight";
import { NowPanel } from "./NowPanel";
import { HeroPortrait } from "./HeroPortrait";
import { HeroIntro } from "./HeroIntro";
import styles from "./Hero.module.css";

/**
 * Hero — sections gauche (kicker → h1 → lede → CTAs) et droite
 * (portrait + Currently).
 * Le spotlight de grille est en fond absolu, sous les enfants.
 * HeroIntro est un composant client qui orchestre l'intro GSAP.
 */
export async function Hero() {
  const t = await getTranslations();

  return (
    <section className={styles.hero}>
      <GridSpotlight />

      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <HeroIntro>
              <p className={styles.kicker} data-hero-el="kicker">
                {t("hero.role")} · {t("hero.location")}
              </p>

              <h1 className={styles.title} data-hero-el="title">
                {t("hero.titleLine1")}
                <span className={styles.dim} data-hero-el="title-dim">
                  {t("hero.titleLine2")}
                </span>
              </h1>

              <p className={styles.lede} data-hero-el="lede">
                {t("hero.leadPart1")}{" "}
                <em className={styles.emStrong}>BkSquare SARL</em>{" "}
                {t("hero.leadPart2")}{" "}
                <span className={styles.accent}>
                  {t("hero.signature")}
                </span>{" "}
                {t("hero.signatureEnding")}
              </p>

              <div className={styles.ctaRow} data-hero-el="cta">
                <Button href="#travail" variant="primary" arrow>
                  {t("hero.ctaProjects")}
                </Button>
                <Button href="#contact" variant="ghost">
                  {t("hero.ctaContact")}
                </Button>
              </div>
            </HeroIntro>
          </div>

          <div className={styles.right}>
            <HeroPortrait />
            <NowPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
