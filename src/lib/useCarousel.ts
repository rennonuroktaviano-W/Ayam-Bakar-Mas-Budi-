"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CarouselState = {
  /** True only when the rail actually has something hidden off to the right. */
  overflow: boolean;
  atStart: boolean;
  atEnd: boolean;
};

/** Before measuring we assume there is nothing to scroll, so the arrows are
    never server-rendered or shown on a rail that has stopped overflowing. */
const UNKNOWN: CarouselState = { overflow: false, atStart: true, atEnd: true };

const EDGE_TOLERANCE = 1;

/**
 * Drives a horizontal scroll rail and reports enough state for arrow buttons.
 *
 * Arrows are shown whenever the rail overflows and hidden when it does not. That
 * single rule covers both "more than one item" and "nothing to scroll": on `sm`
 * and up the rails are `display: none` (they become grids), so `clientWidth`
 * collapses to 0 and `overflow` goes false on its own.
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<CarouselState>(UNKNOWN);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft;

      setState((prev) => {
        const next: CarouselState = {
          overflow: maxScroll > EDGE_TOLERANCE,
          atStart: left <= EDGE_TOLERANCE,
          atEnd: left >= maxScroll - EDGE_TOLERANCE,
        };
        const unchanged =
          prev.overflow === next.overflow &&
          prev.atStart === next.atStart &&
          prev.atEnd === next.atEnd;
        // Bail out when nothing changed: scroll fires every frame and a fresh
        // object would re-render on all of them.
        return unchanged ? prev : next;
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener("scroll", schedule, { passive: true });

    // Card widths are percentages and chips size to their text, so the step
    // distance and the overflow state change with the viewport and with fonts.
    const observer = new ResizeObserver(schedule);
    observer.observe(el);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("scroll", schedule);
      observer.disconnect();
    };
  }, []);

  const scrollByStep = useCallback((direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;

    // Advance exactly one item rather than a whole viewport. `.snap-item` sets
    // `scroll-snap-stop: always`, so the browser lands on the next snap point
    // instead of skipping past several cards.
    const first = el.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth;

    if (step <= 0) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const prev = useCallback(() => scrollByStep(-1), [scrollByStep]);
  const next = useCallback(() => scrollByStep(1), [scrollByStep]);

  return { ref, ...state, prev, next };
}