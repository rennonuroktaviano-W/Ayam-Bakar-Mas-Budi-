"use client";

import Image from "next/image";
import { Check, MessageCircle, Truck } from "lucide-react";
import { promoPaket } from "@/data/menu";
import { formatRupiah, waMenuLink } from "@/lib/whatsapp";
import { useCarousel } from "@/lib/useCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CarouselArrows } from "@/components/ui/CarouselArrows";

type PromoItem = (typeof promoPaket)[number];

export function Promo() {
  const promo = useCarousel<HTMLDivElement>();

  return (
    <section
      id="promo"
      className="relative overflow-hidden bg-api-charcoal py-12 sm:py-16 lg:py-20"
      aria-labelledby="promo-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-api-orange/20 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Paket & Promo"
          title="Paket Hemat, Buat Makan Bareng"
          description="Lebih murah dibanding pesan satuan, dan porsinya sudah pas untuk makan bersama. Tanya langsung lewat WhatsApp ya."
          tone="dark"
        />

        <CarouselArrows
          overflow={promo.overflow}
          atStart={promo.atStart}
          atEnd={promo.atEnd}
          onPrev={promo.prev}
          onNext={promo.next}
          controls="promo-rail"
          label="paket promo"
          tone="dark"
          className="mb-3"
        />

        {/* Mobile: scroll-snap carousel so the section is one card tall, not three. */}
        <div
          id="promo-rail"
          ref={promo.ref}
          className="snap-x-rail snap-x-fade -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:hidden"
        >
          {promoPaket.map((promo, index) => (
            <div key={promo.id} className="snap-item w-[84%] shrink-0">
              <PromoCard promo={promo} index={index} />
            </div>
          ))}
        </div>

        {/* sm and up: grid */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {promoPaket.map((promo, index) => (
            <PromoCard key={promo.id} promo={promo} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PromoCard({ promo, index }: { promo: PromoItem; index: number }) {
  const saving = promo.originalPrice - promo.price;
  const discount = Math.round((saving / promo.originalPrice) * 100);

  return (
    <article
      className="reveal group flex h-full flex-col overflow-hidden rounded-3xl bg-api-charcoal-soft ring-1 ring-white/10 transition duration-300 hover:ring-api-orange/50 sm:hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <Image
          src={promo.image}
          alt={promo.name}
          fill
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 45vw, 380px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <Badge tone="honey" className="absolute top-3 left-3">
          Hemat {discount}%
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="font-display text-lg font-bold text-white sm:text-xl">
          {promo.name}
        </h3>
        <p className="mt-1 text-sm text-stone-400">{promo.tagline}</p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-api-honey">
            {formatRupiah(promo.price)}
          </span>
          <span className="text-sm text-stone-500 line-through">
            {formatRupiah(promo.originalPrice)}
          </span>
        </div>

        <ul className="mt-4 space-y-2">
          {promo.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-stone-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-api-orange" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>

        {/* min-w keeps both actions on one row at every width that fits them, and
            lets them stack instead of squeezing the labels on very narrow phones. */}
        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          <a
            href={waMenuLink(promo.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-30 flex-1 items-center justify-center gap-1.5 rounded-full bg-api-orange px-2 text-xs font-semibold text-white transition hover:bg-api-orange-dark sm:gap-2 sm:px-4 sm:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            Pesan
          </a>
          <a
            href={waMenuLink(
              `nasi box catering minimal 10 box (${promo.name})`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-30 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/20 px-2 text-xs font-semibold text-stone-200 transition hover:border-api-honey hover:text-api-honey sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Truck className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            Tanya Detail
          </a>
        </div>
      </div>
    </article>
  );
}