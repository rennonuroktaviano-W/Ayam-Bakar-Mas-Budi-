import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-xl"
      aria-label="Ayam Bakar Mas Budi - Beranda"
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority
        className="h-10 w-10 shrink-0 rounded-xl shadow-md transition duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-bold tracking-tight sm:text-lg ${
            tone === "light" ? "text-white" : "text-api-charcoal"
          }`}
        >
          Ayam Bakar
        </span>
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-api-orange">
          Mas Budi
        </span>
      </span>
    </Link>
  );
}
