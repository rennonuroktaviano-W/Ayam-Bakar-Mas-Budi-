import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section
      id="testimoni"
      className="bg-api-cream py-14 sm:py-16 lg:py-20"
      aria-labelledby="testimoni-title"
    >
      <SectionHeading
        eyebrow="Testimoni"
        title="Kata Pelanggan"
        description="Review asli dari pelanggan yang makan di tempat maupun yang pesan via WhatsApp."
      />

      <Container>
        {/* Mobile: scroll-snap carousel */}
        <ul className="snap-x-rail -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:hidden">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="snap-item flex w-[85%] shrink-0 flex-col rounded-2xl bg-white p-6 shadow-md shadow-api-charcoal/5"
            >
              <Quote
                className="h-7 w-7 text-api-orange/30"
                aria-hidden
              />
              <p className="mt-3 flex-1 leading-relaxed text-stone-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <RatingStars rating={testimonial.rating} />
              <p className="mt-3 text-sm font-bold text-api-charcoal">
                {testimonial.name}
              </p>
              <p className="text-xs text-stone-500">{testimonial.role}</p>
            </li>
          ))}
        </ul>

        {/* sm and up: grid */}
        <ul className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li
              key={testimonial.id}
              className="reveal flex flex-col rounded-2xl bg-white p-6 shadow-md shadow-api-charcoal/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-api-orange/15"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Quote className="h-7 w-7 text-api-orange/30" aria-hidden />
              <p className="mt-3 flex-1 leading-relaxed text-stone-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <RatingStars rating={testimonial.rating} />
              <p className="mt-3 text-sm font-bold text-api-charcoal">
                {testimonial.name}
              </p>
              <p className="text-xs text-stone-500">{testimonial.role}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div
      className="mt-4 flex gap-0.5"
      role="img"
      aria-label={`Penilaian ${rating} dari 5 bintang`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={`h-4 w-4 ${
            index < rating
              ? "fill-api-honey text-api-honey"
              : "fill-stone-200 text-stone-200"
          }`}
        />
      ))}
    </div>
  );
}
