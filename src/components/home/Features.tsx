import { processSteps } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Features() {
  return (
    <section
      id="proses"
      className="scroll-mt-24 bg-white py-12 sm:py-16"
      aria-labelledby="proses-title"
    >
      <SectionHeading
        eyebrow="Proses Memasak"
        title="Tiga Langkah, dari Marinasi sampai Sajian"
        description="Ayam dimarinasi, dibakar di atas arang, lalu disajikan dengan lalapan dan nasi."
      />
      <Container>
        <ol className="grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <li
              key={step.step}
              className="reveal relative flex flex-col rounded-3xl border border-api-charcoal/5 bg-api-cream/70 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-api-orange/15 sm:p-7"
              style={{ animationDelay: `${index * 0.08}s` }}
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
  );
}