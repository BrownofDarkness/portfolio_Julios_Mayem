import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { TopbarMobile } from "./TopbarMobile";
import styles from "./Topbar.module.css";

/**
 * Topbar sticky, sobre.
 * - Point cyan statique + brand mono
 * - Nav ancrée aux sections avec préfixe numérique mono discret
 * - LanguageSwitch client à droite, séparé d'un filet
 * - Pas de backdrop-blur agressif, on garde du contraste
 */
export async function Topbar() {
  const t = await getTranslations("nav");

  const items = [
    { href: "/#travail",      key: "work",         num: "01" },
    { href: "/#a-propos",     key: "about",        num: "02" },
    { href: "/#competences",  key: "skills",       num: "03" },
    { href: "/#notes",        key: "notes",        num: "04" },
    { href: "/#distinctions", key: "distinctions", num: "05" },
    { href: "/contact",       key: "contact",      num: "06" },
  ] as const;

  return (
    <header className={styles.top}>
      <div className="wrap">
        <div className={styles.row}>
          <Link href="/" className={styles.brand} aria-label="Julios Mayem">
            <span className={styles.dot} aria-hidden="true" />
            julios.mayem
          </Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            {items.map((item) => (
              <Link key={item.key} href={item.href} className={styles.link}>
                <span className={styles.num}>{item.num}</span>
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            <LanguageSwitch />
            <TopbarMobile
              items={items.map((item) => ({
                href: item.href,
                num: item.num,
                label: t(item.key),
              }))}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
