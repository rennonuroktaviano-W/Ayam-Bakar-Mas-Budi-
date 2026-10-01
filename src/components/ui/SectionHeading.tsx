import type { ReactNode } from "react";
import { Container } from "./Container";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl";
  const titleColor = tone === "dark" ? "text-white" : "text-api-charcoal";
  const bodyColor = tone === "dark" ? "text-stone-300" : "text-stone-600";

  return (
    <Container className={className}>
      <div className={`${alignment} mb-10 sm:mb-14`}>
        {eyebrow ? (
          <p
            className={`mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
              tone === "dark" ? "text-api-honey" : "text-api-orange"
            }`}
          >
            <span
              aria-hidden
              className="h-px w-6 bg-current opacity-60 sm:w-8"
            />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`font-display text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${bodyColor}`}>
            {description}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
