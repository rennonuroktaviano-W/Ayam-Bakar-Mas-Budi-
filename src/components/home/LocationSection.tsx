import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { formattedAddress, mapsDirectionsUrl, site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalButtonLink } from "@/components/ui/Button";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { waCustomLink } from "@/lib/whatsapp";

export function LocationSection() {
  return (
    <section
      id="lokasi"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="lokasi-title"
    >
      <SectionHeading
        eyebrow="Lokasi & Jam Buka"
        title="Mampir, Ngabisin Saja"
        description="Parkir motor gratis di depan. Datang saja, atau pesan dulu biar tidak kehabisan menu pas jam sibuk."
      />

      <Container>
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="flex h-full flex-col gap-5 rounded-3xl border border-api-charcoal/10 bg-api-cream/60 p-6 sm:p-7">
              <div>
                <h3 className="font-display text-lg font-bold text-api-charcoal">
                  Alamat
                </h3>
                <p className="mt-2 flex gap-3 text-sm leading-relaxed text-stone-600">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-api-orange"
                    aria-hidden
                  />
                  {formattedAddress}
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-api-charcoal">
                  Jam Buka
                </h3>
                <dl className="mt-2 divide-y divide-api-charcoal/5 text-sm">
                  {site.hours.map((day) => (
                    <div key={day.day} className="flex items-center justify-between gap-3 py-1.5">
                      <dt className="text-stone-600">{day.day}</dt>
                      <dd className="font-semibold text-stone-700 tabular-nums">
                        {day.open.replace(":", ".")} &ndash;{" "}
                        {day.close.replace(":", ".")}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Waktu Indonesia Barat (WIB)
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <ExternalButtonLink
                  href={mapsDirectionsUrl}
                  variant="dark"
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Petunjuk Arah
                </ExternalButtonLink>
                <ExternalButtonLink
                  href={waCustomLink("Halo, saya mau pesan untuk makan di tempat.")}
                  variant="outline"
                  className="flex-1"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Pesan Dine In
                </ExternalButtonLink>
              </div>
            </div>
          </div>

          <MapEmbed className="order-1 lg:order-2 lg:col-span-3" />
        </div>
      </Container>
    </section>
  );
}
