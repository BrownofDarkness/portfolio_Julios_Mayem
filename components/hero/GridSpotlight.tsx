"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./GridSpotlight.module.css";

/**
 * Variante A — Spotlight lissé.
 * Une grille bleue est masquée par un radial-gradient centré sur le curseur.
 * gsap.quickTo() lisse la position sur ~200ms → mouvement doux, pas de jitter.
 * Désactivé sous 780px et sous prefers-reduced-motion.
 */
export function GridSpotlight() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 780px) and (prefers-reduced-motion: no-preference)",
      () => {
        // valeurs de départ centrées horizontalement, haut du hero
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "20%");

        const setX = gsap.quickTo(el, "--mx", {
          duration: 0.38,
          ease: "power3",
        });
        const setY = gsap.quickTo(el, "--my", {
          duration: 0.38,
          ease: "power3",
        });

        const onMove = (e: MouseEvent) => {
          if (rafRef.current !== null) return;
          rafRef.current = window.requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setX(x);
            setY(y);
            rafRef.current = null;
          });
        };

        window.addEventListener("mousemove", onMove, { passive: true });

        return () => {
          window.removeEventListener("mousemove", onMove);
          if (rafRef.current !== null) {
            window.cancelAnimationFrame(rafRef.current);
          }
        };
      }
    );

    return () => mm.revert();
  }, []);

  return <div ref={wrapRef} className={styles.grid} aria-hidden="true" />;
}
