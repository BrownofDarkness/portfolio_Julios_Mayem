import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SectionHead } from "@/components/section/SectionHead";
import { Socials } from "@/components/socials/Socials";
import { ContactForm } from "@/components/contact/ContactForm";

import styles from "./contact.module.css";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!routing.locales.includes(raw as Locale)) return null;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div className={`wrap ${styles.wrap}`}>
      <SectionHead
        index="—"
        title={t("sections.contactTitle")}
        aside={t("sections.contactAside")}
      />

      <div className={styles.grid}>
        <div className={styles.left}>
          <ContactForm />

          <div className={styles.channels}>
            <div className={styles.channel}>
              <div className={styles.label}>Email</div>
              <a href="mailto:maesjulios@gmail.com" className={styles.mainLink}>
                maesjulios@gmail.com
              </a>
            </div>

            <div className={styles.channel}>
              <div className={styles.label}>
                {locale === "fr" ? "Téléphone" : "Phone"}
              </div>
              <ul className={styles.list}>
                <li>
                  <a href="tel:+237678542195" className={styles.item}>
                    <span className={styles.itemKey}>tel</span>
                    <span className={styles.itemVal}>+237 678 54 21 95</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+237656788959" className={styles.item}>
                    <span className={styles.itemKey}>tel</span>
                    <span className={styles.itemVal}>+237 656 78 89 59</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.channel}>
              <div className={styles.label}>
                {locale === "fr" ? "Réseaux" : "Networks"}
              </div>
              <Socials size={22} />
            </div>
          </div>
        </div>

        <aside className={styles.side}>
          <div className={styles.sideBlock}>
            <div className={styles.label}>
              {locale === "fr" ? "Basé à" : "Based in"}
            </div>
            <div className={styles.sideValue}>Yaoundé, Cameroun</div>
            <div className={styles.sideMuted}>UTC+1</div>
          </div>
          <div className={styles.sideBlock}>
            <div className={styles.label}>
              {locale === "fr" ? "Ouvert à" : "Open to"}
            </div>
            <div className={styles.sideValue}>
              {locale === "fr" ? (
                <>
                  Master / doctorat<br />
                  Mission de recherche<br />
                  Poste en labo IA
                </>
              ) : (
                <>
                  Master&apos;s / PhD<br />
                  Research contracts<br />
                  AI-lab positions
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
