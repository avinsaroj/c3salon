export const SITE = {
  name: "C3 Unisex Salon",
  tagline: "Cut, Color & Care",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://c3unisexsalon.example",
  phone: "+919902106797",
  phoneDisplay: "+91 99021 06797",
  whatsapp: "919902106797",
  instagram: "c3_unisex_salon_belgaum",
  instagramUrl: "https://www.instagram.com/c3_unisex_salon_belgaum/",
  city: "Belgaum",
  // The printed price list has a Google review QR code but no readable URL.
  // Set NEXT_PUBLIC_REVIEW_URL to the salon's Google review link.
  reviewUrl:
    process.env.NEXT_PUBLIC_REVIEW_URL ??
    "https://www.google.com/search?q=C3+Unisex+Salon+Belgaum+reviews",
  // Replace with the salon's Google Maps link once the exact address is known.
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=C3+Unisex+Salon+Belgaum",
  mapEmbedUrl: "https://www.google.com/maps?q=C3+Unisex+Salon+Belgaum&output=embed",
} as const;

export const DEFAULT_WA_MESSAGE = "Hi C3 Unisex Salon, I would like to book an appointment.";

export function waLink(message = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookHref(service?: string) {
  return service ? `/contact?service=${encodeURIComponent(service)}#book` : "/contact#book";
}

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Bridal", href: "/bridal" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const EASE = [0.22, 1, 0.36, 1] as const;
