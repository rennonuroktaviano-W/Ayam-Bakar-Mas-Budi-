import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { waCustomLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section
      className="bg-api-cream pb-12 sm:pb-16 lg:pb-20"
      aria-labelledby="cta-title"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-api-orange to-api-brick px-5 py-10 text-center shadow-xl shadow-api-orange/25 sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-api-honey/25 blur-3xl"
          />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-api-honey">
              {site.phoneDisplay}
            </p>
            <h2
              id="cta-title"
              className="mt-3 font-display text-3xl leading-tight font-bold text-white text-balance sm:text-4xl lg:text-5xl"
            >
              Lapar? Pesan Sekarang!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 text-pretty">
              Kirim pesan ke WhatsApp kami, pilih menunya, lalu kami yang
              siapkan. Cocok untuk makan di tempat, takeaway, sampai nasi box
              acara.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ExternalButtonLink
                href={waCustomLink("Halo, saya mau pesan ayam bakar.")}
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Pesan via WhatsApp
              </ExternalButtonLink>
              <ExternalButtonLink
                href={waCustomLink("Halo, saya mau tanya ketersediaan menu.")}
                size="lg"
                variant="outline"
                className="w-full border-white bg-transparent text-white hover:bg-white hover:text-api-orange sm:w-auto"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Tanya Availability
              </ExternalButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
