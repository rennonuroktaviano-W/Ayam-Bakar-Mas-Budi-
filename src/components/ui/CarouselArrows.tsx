"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const tones = {
  light:
    "bg-white text-api-charcoal ring-1 ring-api-charcoal/10 shadow-sm hover:text-api-orange hover:ring-api-orange/40",
  dark: "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20",
} as const;

const base =
  "inline-flex h-11 w-11 items-center justify-center rounded-full transition duration-200 active:scale-95";

/**
 * Click controls for a horizontal scroll rail, for people who would rather tap
 * than swipe. Renders nothing when the rail does not overflow, which also hides
 * it automatically at `sm` and up where the rails turn into grids.
 *
 * `useCarousel` owns the scroll state; this only draws it.
 */
export function CarouselArrows({
  overflow,
  atStart,
  atEnd,
  onPrev,
  onNext,
  controls,
  label,
  tone = "light",
  className = "",
}: {
  overflow: boolean;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  /** id of the rail these buttons drive, for aria-controls */
  controls: string;
  /** noun used in the accessible name, e.g. "menu" -> "Geser menu ke kanan" */
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  if (!overflow) return null;

  return (
    <div className={`flex justify-end gap-2 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={atStart}
        aria-controls={controls}
        aria-label={`Geser ${label} ke kiri`}
        className={`${base} ${tones[tone]} disabled:pointer-events-none disabled:opacity-35`}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={atEnd}
        aria-controls={controls}
        aria-label={`Geser ${label} ke kanan`}
        className={`${base} ${tones[tone]} disabled:pointer-events-none disabled:opacity-35`}
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}