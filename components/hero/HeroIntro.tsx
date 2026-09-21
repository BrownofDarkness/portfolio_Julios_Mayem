"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * HeroIntro — orchestre l'apparition séquencée des éléments du hero.
 * Cible tous les enfants portant [data-hero-el] et les révèle dans
 * l'ordre : kicker → titre → dim → lede → cta. Total ~830ms.
 * gsap.matchMedia() désactive proprement sous prefers-reduced-motion.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = scope.querySelectorAll<HTMLElement>("[data-hero-el]");
      if (elements.length === 0) return;

      gsap.set(elements, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.413,
        stagger: 0.084,
      });
    });

    return () => mm.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
