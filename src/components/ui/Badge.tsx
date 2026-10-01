import type { ReactNode } from "react";

const tones = {
  orange: "bg-api-orange/15 text-api-orange-dark ring-1 ring-api-orange/30",
  honey: "bg-api-honey/25 text-[#8a5a06] ring-1 ring-api-honey/40",
  brick: "bg-api-brick/15 text-api-brick ring-1 ring-api-brick/25",
  charcoal: "bg-api-charcoal text-white ring-1 ring-api-charcoal",
  light: "bg-white/90 text-api-charcoal ring-1 ring-api-charcoal/15",
} as const;

export function Badge({
  children,
  tone = "orange",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
