import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { waCustomLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-api-charcoal pt-20 pb-16 sm:pt-24 lg:pt-28 lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-api-orange/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-api-honey/15 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Badge tone="honey" className="mb-5">
              <Star className="mr-1 h-3 w-3 fill-current" aria-hidden />
              Buka sejak 2011
            </Badge>

            <h1
              id="hero-title"
              className="font-display text-[clamp(2.25rem,7vw,4rem)] leading-[1.08] font-bold text-white text-balance"
            >
              Ayam Bakar,{" "}
              <span className="text-api-honey">Bumbu Racikan</span>{" "}
              Sendiri
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-300 text-pretty sm:text-lg">
              Bakar di atas arang kayu keras, marinasi 6 jam dengan bumbu
              racikan sendiri.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/menu" size="lg" className="w-full sm:w-auto">
                Lihat Menu
                <ArrowRight className="h-5 w-5" aria-hidden />
              </ButtonLink>
              <ExternalButtonLink
                href={waCustomLink("Halo, saya mau pesan ayam bakar.")}
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Pesan via WhatsApp
              </ExternalButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40 sm:rounded-4xl">
              <Image
                src="/images/hero-ayam-bakar.webp"
                alt="Ayam bakar di atas piring dengan sambal dan lalapan"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 512px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-api-charcoal/70 via-transparent to-transparent"
              />

              {/* Floating price card */}
              <div className="absolute right-3 bottom-3 left-3 rounded-2xl bg-white/95 p-3.5 backdrop-blur sm:right-4 sm:bottom-4 sm:left-auto sm:w-64 sm:p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-api-orange">
                  Paket keluarga
                </p>
                <p className="mt-1 font-display text-xl font-bold text-api-charcoal">
                  Rp189.000
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-stone-600">
                  4 ayam bakar + 2 nasi + lalapan, buat 3-4 orang
                </p>
                <Link
                  href="/menu?kategori=paket"
                  className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-api-orange underline-offset-4 hover:underline"
                >
                  Lihat paket lainnya
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Steam accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-4 -right-2 flex gap-1.5 opacity-70 sm:-top-6 sm:right-4"
            >
              <span className="h-10 w-1.5 animate-steam rounded-full bg-white/20" />
              <span
                className="h-14 w-1.5 animate-steam rounded-full bg-white/15"
                style={{ animationDelay: "0.8s" }}
              />
              <span
                className="h-8 w-1.5 animate-steam rounded-full bg-white/10"
                style={{ animationDelay: "1.6s" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
