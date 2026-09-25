"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./TopbarMobile.module.css";

type Item = { href: string; num: string; label: string };

export function TopbarMobile({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  // Ferme le menu au changement de route (navigation par ancre)
  useEffect(() => {
    if (!open) return;
    function onHashChange() { setOpen(false); }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [open]);

  // Bloque le scroll body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className={styles.burger}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
        <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
        <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
      </button>

      {open && (
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="Navigation mobile"
      >
        {items.map((item) =>
          item.href.startsWith("/") ? (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              <span className={styles.num}>{item.num}</span>
              {item.label}
            </Link>
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              <span className={styles.num}>{item.num}</span>
              {item.label}
            </a>
          )
        )}
      </nav>
    </>
  );
}
