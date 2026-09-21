"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./ProjectsGrid.module.css";

/**
 * Wrapper client de la grille projets.
 * Utilise ScrollTrigger pour révéler les cartes avec un stagger
 * discret quand elles entrent dans le viewport.
 * Désactivé sous prefers-reduced-motion (via matchMedia).
 */
export function ProjectsGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = el.querySelectorAll<HTMLElement>(":scope > a");
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 12 });

      const triggers: ScrollTrigger[] = [];

      cards.forEach((card, i) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.413,
              delay: i * 0.06,
              ease: "power3.out",
            });
          },
        });
        triggers.push(st);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={styles.grid}>
      {children}
    </div>
  );
}
