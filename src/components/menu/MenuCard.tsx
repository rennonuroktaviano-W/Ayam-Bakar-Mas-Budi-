"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { formatRupiah, waMenuLink } from "@/lib/whatsapp";
import { useCarousel } from "@/lib/useCarousel";
import { badgeLabels } from "@/data/menu";
import type { MenuBadge, MenuItem } from "@/data/menu";
import { Badge } from "@/components/ui/Badge";
import { CarouselArrows } from "@/components/ui/CarouselArrows";

const badgeTone: Record<MenuBadge, "orange" | "brick" | "honey"> = {
  pedas: "brick",
  baru: "honey",
};

/**
 * The card renders in two very different widths on mobile: ~293px inside the
 * homepage carousel and ~173px inside the two-column `/menu` grid. Viewport
 * breakpoints cannot tell those apart, so the internals size off the card's own
 * width via `@container` instead. Below `@xs` (20rem) it switches to the compact
 * two-column treatment; at and above it keeps the roomier single-column layout.
 */
export function MenuCard({
  item,
  priority = false,
  className = "",
}: {
  item: MenuItem;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`@container group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-api-charcoal/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-api-orange/15 ${className}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-api-sand">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 360px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {item.badges && item.badges.length > 0 ? (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 @xs:top-3 @xs:left-3">
            {item.badges.map((badge) => (
              <Badge key={badge} tone={badgeTone[badge]}>
                {badgeLabels[badge]}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3 @xs:p-5">
        <h3 className="font-display text-sm leading-snug font-bold text-balance text-api-charcoal @xs:text-lg">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600 @xs:mt-2 @xs:text-sm">
          {item.description}
        </p>

        <div className="mt-auto pt-3 @xs:flex @xs:items-end @xs:justify-between @xs:gap-3 @xs:pt-5">
          <p className="font-display text-base font-bold text-api-orange @xs:text-xl">
            {formatRupiah(item.price)}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5 @xs:mt-0 @xs:flex @xs:items-center @xs:gap-2">
            <a
              href={waMenuLink(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pesan ${item.name} via WhatsApp`}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-api-charcoal text-white transition hover:bg-api-orange focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-api-honey @xs:w-11 @xs:flex-none"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
            <Link
              href={`/menu#${item.id}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-api-charcoal/15 px-2 text-xs font-semibold text-api-charcoal transition hover:border-api-orange hover:text-api-orange @xs:flex-none @xs:px-4 @xs:text-sm"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedMenuRail({
  items,
}: {
  items: MenuItem[];
}) {
  const rail = useCarousel<HTMLDivElement>();

  return (
    <>
      <CarouselArrows
        overflow={rail.overflow}
        atStart={rail.atStart}
        atEnd={rail.atEnd}
        onPrev={rail.prev}
        onNext={rail.next}
        controls="menu-favorit-rail"
        label="menu"
        className="mb-3"
      />

      {/* Mobile: native scroll-snap carousel */}
      <div
        id="menu-favorit-rail"
        ref={rail.ref}
        className="snap-x-rail snap-x-fade -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:hidden"
      >
        {items.map((item) => (
          <div key={item.id} className="snap-item w-[82%] shrink-0">
            <MenuCard item={item} />
          </div>
        ))}
      </div>

      {/* sm and up: grid */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <MenuCard key={item.id} item={item} priority={index < 3} />
        ))}
      </div>
    </>
  );
}

export function ViewAllMenuLink() {
  return (
    <Link
      href="/menu"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-api-charcoal px-6 py-3 text-sm font-semibold text-white transition hover:bg-api-orange"
    >
      Lihat Semua Menu
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}