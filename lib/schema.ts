import type { Metadata } from "next";
import { SITE } from "./site";
import type { Faq, Service } from "./services";

export const seo = {
  title: "C3 Unisex Salon Belgaum | Best Hair, Bridal Makeup & Beauty Salon",
  description:
    "C3 Unisex Salon, Belgaum: premium hair cuts, hair colour, bridal makeup, facials and grooming for men and women. View the price list and book on WhatsApp.",
  keywords: [
    "C3 Unisex Salon Belgaum",
    "C3 Salon Belgaum",
    "Unisex Salon Belgaum",
    "Best Salon in Belgaum",
    "Hair Salon Belgaum",
    "Beauty Salon Belgaum",
    "Bridal Makeup Belgaum",
    "Hair Color Belgaum",
    "Men's Salon Belgaum",
    "Ladies Salon Belgaum",
  ],
};

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE.name} Belgaum`,
      description,
      url: path,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

const BUSINESS_ID = `${SITE.url}/#business`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon"],
  "@id": BUSINESS_ID,
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  slogan: SITE.tagline,
  priceRange: "₹₹",
  image: `${SITE.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgaum",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [SITE.instagramUrl],
};

export function servicesSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.blurb,
      areaServed: "Belgaum",
      provider: { "@id": BUSINESS_ID },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: s.from.replace(/[^\d]/g, ""),
        description: "Starting price",
      },
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name, item: `${SITE.url}${path}` },
    ],
  };
}
