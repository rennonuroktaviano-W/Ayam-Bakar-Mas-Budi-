import type { Metadata } from "next";
import { site } from "@/data/site";
import { menu } from "@/data/menu";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { Promo } from "@/components/home/Promo";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationSection } from "@/components/home/LocationSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.brand,
    description: site.description,
    url: site.url,
    telephone: site.phoneDisplay,
    priceRange: "Rp10.000 - Rp200.000",
    servesCuisine: "Indonesian",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, QRIS, Debit, Credit Card",
    image: `${site.url}/images/hero-ayam-bakar.webp`,
    logo: `${site.url}/images/logo-mark.webp`,
    sameAs: [site.socials.instagram, site.socials.facebook, site.socials.tiktok],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.latitude,
      longitude: site.coordinates.longitude,
    },
    openingHoursSpecification: site.hours.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day.day}`,
      opens: day.open,
      closes: day.close,
    })),
    hasMenu: {
      "@type": "Menu",
      name: `Menu ${site.brand}`,
      url: `${site.url}/menu`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1200",
      bestRating: "5",
    },
    makesOffer: menu.slice(0, 10).map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
      },
      price: item.price,
      priceCurrency: "IDR",
    })),
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Hero />
      <Features />
      <FeaturedMenu />
      <Promo />
      <AboutSnippet />
      <Testimonials />
      <LocationSection />
      <CtaBanner />
    </>
  );
}
