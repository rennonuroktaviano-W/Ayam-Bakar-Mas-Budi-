"use client";

import { useEffect } from "react";

/**
 * Adds `data-visible="true"` to `.reveal` elements once they scroll into view.
 * Pure CSS animation afterwards, so no per-frame JS work.
 */
export function RevealObserver() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
