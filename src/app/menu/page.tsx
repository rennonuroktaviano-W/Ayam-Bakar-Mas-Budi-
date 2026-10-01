import type { Metadata } from "next";
import { UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { ExternalButtonLink } from "@/components/ui/Button";
import { waCustomLink } from "@/lib/whatsapp";
import type { MenuCategory } from "@/data/menu";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Menu & Harga",
  description:
    "Daftar menu lengkap Ayam Bakar Mas Budi: ayam bakar madu, pedas manis, taliwang, paket keluarga, lauk, minuman, dan dessert. Pesan langsung via WhatsApp.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu & Harga",
    description:
      "Menu lengkap ayam bakar, paket hemat, lauk, minuman, dan dessert. Pesan via WhatsApp.",
    url: "/menu",
  },
};

const validCategories = new Set<MenuCategory>([
  "ayam-bakar",
  "paket",
  "lauk",
  "minuman",
  "dessert",
]);

export default async function MenuPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const raw = params.kategori;
  const candidate = Array.isArray(raw) ? raw[0] : raw;
  const initialCategory =
    candidate && validCategories.has(candidate as MenuCategory)
      ? (candidate as MenuCategory)
      : "semua";

  return (
    <>
      <section className="bg-api-charcoal pt-20 pb-12 sm:pt-24 lg:pt-28">
        <Container>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-api-honey">
            <UtensilsCrossed className="h-4 w-4" aria-hidden />
            Daftar Menu
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight font-bold text-white text-balance">
            Menu &amp; Harga Lengkap
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 text-pretty sm:text-lg">
            Pilih menu di bawah, lalu tap tombol pesan di tiap kartu untuk
            langsung order lewat WhatsApp.
          </p>
          <div className="mt-6">
            <ExternalButtonLink
              href={waCustomLink("Halo, saya mau lihat daftar menu terbaru.")}
              variant="secondary"
            >
              Tanya Menu
            </ExternalButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-api-cream py-10 sm:py-12 lg:py-16">
        <Container>
          <MenuExplorer initialCategory={initialCategory} />
        </Container>
      </section>
    </>
  );
}
