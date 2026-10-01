import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Truck,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  formattedAddress,
  mapsDirectionsUrl,
  mapsPlaceUrl,
  site,
} from "@/data/site";
import { waCustomLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kontak & Lokasi",
  description: `Alamat, jam buka, nomor WhatsApp, dan cara menuju ${site.brand} di ${site.address.city}. Pesan makan di tempat, dibungkus, atau nasi box catering.`,
  alternates: { canonical: "/kontak" },
  openGraph: {
    title: "Kontak & Lokasi",
    description: `Alamat, jam buka, dan nomor WhatsApp ${site.brand}.`,
    url: "/kontak",
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/kontak#restaurant`,
    name: site.brand,
    url: `${site.url}/kontak`,
    telephone: site.phoneDisplay,
    image: `${site.url}/images/ruang-makan.webp`,
    priceRange: "Rp10.000 - Rp200.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.latitude,
      longitude: site.coordinates.longitude,
    },
    openingHoursSpecification: site.hours.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day.day}`,
      opens: day.open,
      closes: day.close,
    })),
    hasMap: mapsPlaceUrl,
  };
}

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: site.phoneDisplay,
    href: waCustomLink("Halo, saya mau bertanya soal menu dan lokasi."),
    hint: "Balasan tercepat, 10.00 - 22.00 WIB",
    highlight: true,
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    value: "@ayambakarmasbudi",
    href: site.socials.instagram,
    hint: "@ayambakarmasbudi",
    highlight: false,
  },
  {
    icon: Mail,
    title: "Email",
    value: "halo@ayambakarmasbudi.id",
    href: "mailto:halo@ayambakarmasbudi.id",
    hint: "Untuk kerja sama dan catering",
    highlight: false,
  },
];

export default function KontakPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="bg-api-charcoal pt-20 pb-12 sm:pt-24 lg:pt-28">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-api-honey">
            Kontak &amp; Lokasi
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight font-bold text-white text-balance">
            Mampir, Telefon, atau Chat
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 text-pretty sm:text-lg">
            Cara tercepat untuk pesan adalah WhatsApp. Kalau mau makan di
            tempat, mending datang langsung karena kami sering sold out
            di jam makan siang.
          </p>
        </Container>
      </section>

      <section className="bg-api-cream py-12 sm:py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <ExternalButtonLink
                  key={channel.title}
                  href={channel.href}
                  variant="outline"
                  className="h-full flex-col items-start gap-3 !rounded-3xl border-api-charcoal/15 p-5 text-left hover:border-api-orange sm:p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-api-orange/10 text-api-orange">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-stone-500">
                      {channel.title}
                    </span>
                    <span className="mt-1 block font-display text-base font-bold break-words text-api-charcoal">
                      {channel.value}
                    </span>
                    <span className="mt-1 block text-xs text-stone-500">
                      {channel.hint}
                    </span>
                  </span>
                  {channel.highlight ? (
                    <Badge tone="orange" className="mt-auto">
                      Paling Cepat
                    </Badge>
                  ) : null}
                </ExternalButtonLink>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-api-charcoal/10 bg-api-cream/60 p-6 sm:p-7">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-api-charcoal">
                    <MapPin className="h-5 w-5 text-api-orange" aria-hidden />
                    Alamat
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {formattedAddress}
                  </p>
<p className="mt-2 text-xs text-stone-500">
                    Parkir motor gratis di depan. Masuk dari Jl. Raya
                    Kuliner, cabang kedua dari ujung.
                  </p>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-api-charcoal">
                    <Clock className="h-5 w-5 text-api-orange" aria-hidden />
                    Jam Buka
                  </h2>
                  <dl className="mt-2 divide-y divide-api-charcoal/5 text-sm">
                    {site.hours.map((day) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between gap-3 py-1.5"
                      >
                        <dt className="text-stone-600">{day.day}</dt>
                        <dd className="font-semibold text-stone-700 tabular-nums">
                          {day.open.replace(":", ".")} &ndash;{" "}
                          {day.close.replace(":", ".")}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <ExternalButtonLink
                    href={mapsDirectionsUrl}
                    variant="dark"
                    className="flex-1"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Petunjuk Arah
                  </ExternalButtonLink>
                  <ExternalButtonLink
                    href={mapsPlaceUrl}
                    variant="outline"
                    className="flex-1"
                  >
                    <MapPin className="h-4 w-4" aria-hidden />
                    Buka Maps
                  </ExternalButtonLink>
                </div>
              </div>
            </div>

            <MapEmbed className="lg:col-span-3" />
          </div>
        </Container>
      </section>

      <section className="bg-api-cream py-12 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-api-charcoal/10 bg-white">
            <div className="grid items-center gap-0 md:grid-cols-2">
              <div className="relative aspect-4/3 w-full md:aspect-auto md:h-full md:min-h-64">
                <Image
                  src="/images/promo-nasi-box.webp"
                  alt="Nasi box ayam bakar untuk catering"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div
                id="catering"
                className="scroll-mt-24 p-6 sm:p-8 lg:p-10"
              >
                <Badge tone="brick" className="mb-4">
                  <Truck className="mr-1 h-3 w-3" aria-hidden />
                  Catering
                </Badge>
                <h2 className="font-display text-2xl leading-tight font-bold text-api-charcoal text-balance sm:text-3xl">
                  Pesan Nasi Box untuk Acara
                </h2>
                <p className="mt-3 leading-relaxed text-stone-600">
                  Minimal 10 box. Cocok untuk kantor, pengajian, arisan, dan
                  acara kecil. Level pedas bisa diatur, dan paket dibuat sesuai permintaan.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-api-orange"
                    />
                    Level pedas bisa diatur 1 sampai 3
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-api-orange"
                    />
                    Pengantaran area dalam kota Bandung
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-api-orange"
                    />
                    H-1 untuk pemesanan, H-3 untuk acara besar
                  </li>
                </ul>
                <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                  <ExternalButtonLink
                    href={waCustomLink(
                      "Halo, saya mau tanya paket nasi box catering.",
                    )}
                    variant="primary"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Tanya Ketersediaan
                  </ExternalButtonLink>
                  <ExternalButtonLink
                    href={mapsDirectionsUrl}
                    variant="outline"
                    className="flex-1"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Lihat Lokasi
                  </ExternalButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
