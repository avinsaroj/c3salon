import type { Metadata } from "next";
import { SITE } from "./site";
import { BRANCHES, type Branch } from "./branches";
import type { Faq, Service } from "./services";

export const seo = {
  title: "C3 Unisex Salon | Hair, Bridal Makeup & Beauty Salon in Belgaum & Kolhapur",
  description:
    "C3 Unisex Salon, Belgaum and Kolhapur: premium hair cuts, hair colour, bridal makeup, facials and grooming for men and women. View your branch's price list and book on WhatsApp.",
  keywords: [
    "C3 Unisex Salon",
    "C3 Unisex Salon Belgaum",
    "C3 Unisex Salon Kolhapur",
    "Unisex Salon Belgaum",
    "Unisex Salon Kolhapur",
    "Best Salon in Belgaum",
    "Best Salon in Kolhapur",
    "Hair Salon Belgaum",
    "Hair Salon Kolhapur",
    "Beauty Salon Belgaum",
    "Beauty Salon Kolhapur",
    "Bridal Makeup Belgaum",
    "Hair Color Belgaum",
    "Hair Color Kolhapur",
  ],
};

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description,
      url: path,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

const businessId = (b: Branch) => `${SITE.url}/#${b.id}`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@graph": BRANCHES.map((b) => ({
    "@type": ["HairSalon", "BeautySalon"],
    "@id": businessId(b),
    name: `${SITE.name} ${b.name}`,
    url: SITE.url,
    telephone: b.phone,
    slogan: SITE.tagline,
    priceRange: "₹₹",
    image: `${SITE.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.street,
      addressLocality: b.city,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: "IN",
    },
    hasMap: b.directionsUrl,
    sameAs: [SITE.instagramUrl],
  })),
};

export function servicesSchema(services: Service[], branch: Branch) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.blurb,
      areaServed: branch.city,
      provider: { "@id": businessId(branch) },
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
