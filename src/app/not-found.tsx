import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      {/* Dark band, same as every other page. The navbar is transparent at the
          top of the page and renders light text, so this has to stay dark or
          the navigation would be white text on a light page. */}
      <section className="bg-api-charcoal pt-20 pb-12 sm:pt-24 lg:pt-28">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-api-honey">
            Error 404
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight font-bold text-white text-balance">
            Halamannya Tidak Ada
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 text-pretty sm:text-lg">
            Halaman yang kamu cari sudah pindah atau tidak pernah ada. Coba
            kembali ke beranda atau lihat menu yang tersedia.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <LinkPill href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Kembali ke Beranda</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function LinkPill({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-stone-200 ring-1 ring-white/15 transition duration-200 hover:bg-white/15 hover:text-white"
    >
      {label}
    </Link>
  );
}
