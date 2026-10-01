"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = ".reveal";

/**
 * Adds `data-visible="true"` to `.reveal` elements once they scroll into view,
 * so the CSS fade-up animation runs. Motion only, nothing layout-related.
 *
 * Two things this must survive:
 * 1. No JavaScript / slow JS -> content must stay visible (handled in CSS via
 *    the `@media (scripting: enabled)` gate, this observer is not what makes
 *    content visible).
 * 2. Client-side navigation -> `layout.tsx` is not remounted, so this effect
 *    has to re-run on every route change. Otherwise newly mounted `.reveal`
 *    elements are never observed and stay invisible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    if (targets.length === 0) return;

    const revealAll = () => {
      targets.forEach((el) => el.setAttribute("data-visible", "true"));
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealAll();
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));

    // Anything already on screen at mount should not wait for a scroll event.
    requestAnimationFrame(() => {
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      });
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
