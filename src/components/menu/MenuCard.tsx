import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, MessageCircle } from "lucide-react";
import { formatRupiah, waMenuLink } from "@/lib/whatsapp";
import { badgeLabels } from "@/data/menu";
import type { MenuBadge, MenuItem } from "@/data/menu";
import { Badge } from "@/components/ui/Badge";

const badgeTone: Record<MenuBadge, "orange" | "brick" | "honey"> = {
  terlaris: "orange",
  pedas: "brick",
  baru: "honey",
};

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
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-api-charcoal/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-api-orange/15 ${className}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-api-sand">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 360px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {item.badges && item.badges.length > 0 ? (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.badges.map((badge) => (
              <Badge key={badge} tone={badgeTone[badge]}>
                {badgeLabels[badge]}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug font-bold text-api-charcoal">
          {item.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {item.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-display text-xl font-bold text-api-orange">
            {formatRupiah(item.price)}
          </p>
          <div className="flex items-center gap-2">
            <a
              href={waMenuLink(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pesan ${item.name} via WhatsApp`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-api-charcoal text-white transition hover:bg-api-orange focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-api-honey"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
            <Link
              href={`/menu#${item.id}`}
              className="inline-flex min-h-11 items-center rounded-full border-2 border-api-charcoal/15 px-4 text-sm font-semibold text-api-charcoal transition hover:border-api-orange hover:text-api-orange"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MenuCardSkeletonNote() {
  return (
    <p className="flex items-center gap-2 text-xs text-stone-500">
      <Flame className="h-3.5 w-3.5 text-api-orange" aria-hidden />
      Harga placeholder, sudah bisa diganti di src/data/menu.ts
    </p>
  );
}

export function FeaturedMenuRail({
  items,
}: {
  items: MenuItem[];
}) {
  return (
    <>
      {/* Mobile: native scroll-snap carousel */}
      <div className="snap-x-rail -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:hidden">
        {items.map((item) => (
          <div key={item.id} className="snap-item w-[78%] shrink-0">
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
