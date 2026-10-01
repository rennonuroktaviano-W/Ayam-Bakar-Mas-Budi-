import Image from "next/image";
import { Check, MessageCircle, Truck } from "lucide-react";
import { promoPaket } from "@/data/menu";
import { formatRupiah, waMenuLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

export function Promo() {
  return (
    <section
      id="promo"
      className="relative overflow-hidden bg-api-charcoal py-14 sm:py-16 lg:py-20"
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

        <div className="grid gap-5 md:grid-cols-3">
          {promoPaket.map((promo, index) => {
            const saving = promo.originalPrice - promo.price;
            const discount = Math.round((saving / promo.originalPrice) * 100);
            return (
              <article
                key={promo.id}
                className="reveal group flex flex-col overflow-hidden rounded-3xl bg-api-charcoal-soft ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-api-orange/50"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <Badge tone="honey" className="absolute top-3 left-3">
                    Hemat {discount}%
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-white">
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
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-stone-300"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-api-orange"
                          aria-hidden
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2 pt-1 sm:flex-row">
                    <a
                      href={waMenuLink(promo.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-api-orange px-4 text-sm font-semibold text-white transition hover:bg-api-orange-dark"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Pesan
                    </a>
                    <a
                      href={waMenuLink(
                        `nasi box catering minimal 10 box (${promo.name})`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-stone-200 transition hover:border-api-honey hover:text-api-honey"
                    >
                      <Truck className="h-4 w-4" aria-hidden />
                      Tanya Detail
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
