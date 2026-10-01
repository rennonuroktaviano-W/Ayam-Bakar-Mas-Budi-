import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Leaf, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { processSteps, values } from "@/data/testimonials";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kisah Ayam Bakar Mas Budi: dari panggangan arang kecil di tahun 2011 jadi warung ayam bakar favorit di Bandung. Bumbu rahasia, arang kayu keras, bahan segar setiap hari.",
  alternates: { canonical: "/tentang" },
  openGraph: {
    title: "Tentang Kami",
    description:
      "Kisah dan proses memasak Ayam Bakar Mas Budi, dari marinasi hingga sajian.",
    url: "/tentang",
  },
};

const valueIcons = [Leaf, Target, Heart];

export default function TentangPage() {
  return (
    <>
      <section className="bg-api-charcoal pt-20 pb-12 sm:pt-24 lg:pt-28">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-api-honey">
            Tentang {site.shortBrand}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight font-bold text-white text-balance">
            Berawal dari Satu Panggangan Arang
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 text-pretty sm:text-lg">
            Tidak ada rencana besar. Cuma ingin bikin ayam bakar yang jujur
            untuk tetangga sendiri, lalu kebetulan mereka balik lagi.
          </p>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-3xl shadow-xl shadow-api-charcoal/10">
              <Image
                src="/images/tim-kitchen.webp"
                alt="Tim dapur Ayam Bakar Mas Budi menyiapkan bumbu"
                fill
                sizes="(max-width: 1024px) 100vw, 512px"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-base leading-relaxed text-stone-600 text-pretty">
              <h2 className="font-display text-2xl font-bold text-api-charcoal sm:text-3xl">
                2011, Saat Masih Panggangan Tunggal
              </h2>
              <p>
                Mas Budi memulai usaha ini dari panggangan arang sederhana di
                halaman rumah. Setiap sore dia membakar lima sampai sepuluh
                ayam untuk tetangga, dan hampir selalu sold out sebelum pukul
                sembilan malam.
              </p>
              <p>
                Pelanggan pertama yang sering datang adalah Drivers ojek online
                yang cari makan murah tapi tetap hangat. Dari sana nama kami
                mulai dikenal dan pesanan mulai berdatangan dari luar daerah.
              </p>
              <p>
                Sampai hari ini, cara masaknya tidak banyak berubah. Yang
                berubah hanya jumlah ayam, tambahan menu, dan tempat yang lebih
                luas untuk menampung pelanggan.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="proses"
        className="scroll-mt-24 bg-api-cream py-12 sm:py-16 lg:py-20"
        aria-labelledby="proses-title"
      >
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-api-orange">
              Proses Memasak
            </p>
            <h2
              id="proses-title"
              className="mt-3 font-display text-3xl leading-tight font-bold text-api-charcoal text-balance sm:text-4xl"
            >
              Tiga Langkah, Tidak Ada yang Dipotong
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 text-pretty">
              Dari marinasi sampai sajian, semua dikerjakan manual oleh tim
              dapur.
            </p>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <li
                key={step.step}
                className="reveal relative flex flex-col rounded-3xl bg-white p-5 shadow-md shadow-api-charcoal/5 sm:p-7"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-display text-4xl font-bold text-api-orange/25">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-api-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-stone-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-api-orange">
              Nilai Kami
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-bold text-api-charcoal text-balance sm:text-4xl">
              Kenapa Pelanggan Tetap Setia
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <article
                  key={value.title}
                  className="reveal flex flex-col rounded-3xl border border-api-charcoal/10 bg-api-cream/60 p-5 sm:p-7"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-api-orange text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-api-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-stone-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <ButtonLink href="/menu" size="lg">
              Lihat Menu Sekarang
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
