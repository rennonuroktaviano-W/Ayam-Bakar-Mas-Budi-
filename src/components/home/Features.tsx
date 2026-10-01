import { Flame, Leaf, Sparkles, Wallet } from "lucide-react";
import { features } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = { sparkles: Sparkles, flame: Flame, leaf: Leaf, wallet: Wallet };

export function Features() {
  return (
    <section
      id="keunggulan"
      className="scroll-mt-24 bg-white py-12 sm:py-16"
      aria-labelledby="keunggulan-title"
    >
      <SectionHeading
        eyebrow="Keunggulan Kami"
        title="Kenapa Orang Selalu Kembali?"
        description="Bukan cuma rasa, tapi juga cara kami memasak tetap konsisten sejak 2011."
      />
      <Container>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <li
                key={feature.title}
                className="reveal flex flex-col rounded-2xl border border-api-charcoal/5 bg-api-cream/70 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-api-orange/15 sm:p-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-api-orange/10 text-api-orange ring-1 ring-api-orange/20">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-api-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
