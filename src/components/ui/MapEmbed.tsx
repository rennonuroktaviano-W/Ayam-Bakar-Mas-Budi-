"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { mapsDirectionsUrl, site } from "@/data/site";

/**
 * Google Maps embed is a JS-driven page: the response is an empty div plus a
 * <script> from maps.googleapis.com. When that host is unreachable (adblock,
 * office/school network, firewall) the iframe renders as a blank grey box.
 *
 * So the iframe is only mounted after an explicit click. Before that we render
 * a real, useful placeholder: address, coordinates, and a link out to Maps.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-api-charcoal/10 bg-api-charcoal shadow-md shadow-api-charcoal/5 ${className}`}
    >
      {loaded ? (
        <div className="relative aspect-4/3 w-full sm:aspect-16/10">
          <iframe
            title={`Peta lokasi ${site.brand}`}
            src={site.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <div className="flex aspect-4/3 w-full flex-col items-center justify-center gap-5 px-6 py-10 text-center sm:aspect-16/10 sm:px-10">
          {/* Decorative grid so the box never reads as "broken" */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "2rem 2rem",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-api-orange/25 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-api-orange text-white shadow-lg shadow-api-orange/30">
              <MapPin className="h-7 w-7" aria-hidden />
            </span>
            <p className="max-w-sm font-display text-lg font-bold text-white text-balance">
              {site.address.street}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              {site.address.district}, {site.address.city},{" "}
              {site.address.province}
            </p>
          </div>

          <div className="relative flex flex-col items-center gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-api-orange px-5 text-sm font-semibold text-white transition hover:bg-api-orange-dark active:scale-[0.98] sm:w-auto"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Tampilkan Peta
            </button>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-stone-200 transition hover:border-api-honey hover:text-api-honey sm:w-auto"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Buka di Google Maps
            </a>
          </div>

          <p className="relative text-xs text-stone-500">
            Peta dimuat dari Google Maps saat kamu memintanya.
          </p>
        </div>
      )}
    </div>
  );
}
