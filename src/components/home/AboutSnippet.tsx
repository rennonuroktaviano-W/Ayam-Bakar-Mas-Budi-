import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  "Ayam segar dari pemasok lokal setiap pagi",
  "Arang kayu keras asli, bukan kompor gas",
  "Bumbu diracik sendiri",
  "Lalapan disertakan",
];

export function AboutSnippet() {
  return (
    <section
      id="tentang-singkat"
      className="bg-white py-12 sm:py-16 lg:py-20"
      aria-labelledby="about-snippet-title"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-3xl shadow-xl shadow-api-charcoal/10">
              <Image
                src="/images/dapur-bakar.webp"
                alt="Dapur Mas Budi membakar ayam di atas arang"
                fill
                sizes="(max-width: 1024px) 100vw, 512px"
                className="object-cover"
              />
            </div>

            <div className="absolute -right-2 -bottom-5 w-40 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-right-4 sm:w-52">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src="/images/tim-kitchen.webp"
                  alt="Tim dapur Ayam Bakar Mas Budi"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Cerita Kami"
              title={
                <span id="about-snippet-title">
                  Dari Panggangan Depan Rumah
                </span>
              }
            />
            <div className="-mt-6 space-y-4 text-base leading-relaxed text-stone-600 text-pretty">
              <p>
                Semuanya berawal dari satu panggangan arang di depan rumah Mas
                Budi tahun 2011, untuk tetangga sendiri.
              </p>
              <p>
                Sekarang tempatnya lebih besar, tapi cara masaknya tetap sama.
                Ayam dimarinasi 6 jam, dibakar di atas arang, dan dibolak satu
                per satu secara manual.
              </p>
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-stone-700"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-api-orange"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink href="/tentang" variant="outline">
                Baca Cerita Lengkap
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
