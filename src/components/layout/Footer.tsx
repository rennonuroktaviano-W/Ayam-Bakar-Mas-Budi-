import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";
import { formattedAddress, hoursByRange, site } from "@/data/site";
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
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              {site.tagline}. Bakar di atas arang dengan bumbu yang diracik
              sendiri. Makan di tempat, dibungkus, atau nasi box catering.
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
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-stone-400 transition hover:text-api-honey"
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
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-stone-400 transition hover:text-api-honey"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="font-display text-base font-bold text-white">
              Kunjungi Kami
            </h2>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-3">
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
                  {hoursByRange.map((group) => (
                    <span key={group.range} className="block">
                      {group.days.join(", ")} {group.range} WIB
                    </span>
                  ))}
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
                  className="flex min-h-11 items-center text-stone-400 transition hover:text-api-honey"
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
              className="mt-6 hidden h-20 w-20 rounded-2xl opacity-40 sm:block"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-stone-500 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p>
            &copy; {year} {site.brand}. Semua hak dilindungi.
          </p>
          <p>{site.address.city}, {site.address.province}</p>
        </div>
      </Container>
    </footer>
  );
}
