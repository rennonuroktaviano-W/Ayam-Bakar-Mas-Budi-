import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-api-honey active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-api-orange text-white shadow-lg shadow-api-orange/30 hover:bg-api-orange-dark",
  secondary:
    "bg-api-honey text-api-charcoal shadow-lg shadow-api-honey/30 hover:brightness-105",
  outline:
    "border-2 border-api-orange text-api-orange hover:bg-api-orange hover:text-white",
  ghost: "text-api-charcoal hover:bg-api-charcoal/5",
  dark: "bg-api-charcoal text-white hover:bg-api-charcoal-soft",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base sm:text-lg",
};

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: SharedProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ExternalButtonLink({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: SharedProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
