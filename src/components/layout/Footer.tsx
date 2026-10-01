import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";
import { formattedAddress, site } from "@/data/site";
import { categoryLabels } from "@/data/menu";
import { waCustomLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const menuLinks = [
  { label: "Semua Menu", href: "/menu" },
  ...Object.entries(categoryLabels).map(([value, label]) => ({
    label,
    href: `/menu?kategori=${value}`,
  })),
];

const aboutLinks = [
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Proses Memasak", href: "/tentang#proses" },
  { label: "Kontak & Lokasi", href: "/kontak" },
  { label: "Catering Nasi Box", href: "/kontak#catering" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-api-charcoal text-stone-300">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              {site.tagline}. Sejak 2011 kami bakar di atas arang dengan bumbu
              yang diracik sendiri. Dine in, takeaway, sampai nasi box catering.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <li>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Ayam Bakar Mas Budi"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-stone-300 transition hover:bg-api-orange hover:text-white"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Ayam Bakar Mas Budi"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-stone-300 transition hover:bg-api-orange hover:text-white"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href={site.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Ayam Bakar Mas Budi"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-stone-300 transition hover:bg-api-orange hover:text-white"
                >
                  <TikTokIcon />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Navigasi menu" className="lg:col-span-3">
            <h2 className="font-display text-base font-bold text-white">
              Menu
            </h2>
            <ul className="mt-4 space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-stone-400 transition hover:text-api-honey"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navigasi informasi" className="lg:col-span-2">
            <h2 className="font-display text-base font-bold text-white">
              Informasi
            </h2>
            <ul className="mt-4 space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-stone-400 transition hover:text-api-honey"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-base font-bold text-white">
              Kunjungi Kami
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-api-orange"
                  aria-hidden
                />
                <span className="text-stone-400">{formattedAddress}</span>
              </li>
              <li className="flex gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-api-orange"
                  aria-hidden
                />
                <span className="text-stone-400">
                  Setiap hari 10.00&ndash;22.00 WIB
                  <br />
                  Jumat &amp; Sabtu sampai 23.00 WIB
                </span>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-api-orange"
                  aria-hidden
                />
                <a
                  href={waCustomLink("Halo, saya mau bertanya soal menu.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-8 text-stone-400 transition hover:text-api-honey"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
            <Image
              src="/images/logo-mark.webp"
              alt=""
              width={96}
              height={96}
              aria-hidden
              className="mt-6 h-20 w-20 rounded-2xl opacity-40"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.brand}. Semua hak dilindungi.
          </p>
          <p>Dibuat dengan api dan arang, bukan oven listrik.</p>
        </div>
      </Container>
    </footer>
  );
}
