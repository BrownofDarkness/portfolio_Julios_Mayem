"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LanguageSwitch.module.css";

/**
 * Switcher discret entre les deux langues.
 * Rend la locale courante en évidence (blanc) et bascule vers l'autre
 * en gardant le même pathname traduit.
 */
export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const swap = (target: (typeof routing.locales)[number]) => {
    if (target === locale) return;
    // next-intl route Link est typé de manière stricte ; on autorise
    // ici le pathname dynamique (params préservés côté runtime).
    router.replace(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathname as any,
      { locale: target }
    );
  };

  return (
    <div className={styles.wrap} role="group" aria-label="Langue">
      {routing.locales.map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => swap(l)}
          className={l === locale ? styles.active : styles.inactive}
          aria-current={l === locale ? "true" : undefined}
        >
          {l}
          {i < routing.locales.length - 1 ? (
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
          ) : null}
        </button>
      ))}
      <span className={styles.hidden}>{other}</span>
    </div>
  );
}
