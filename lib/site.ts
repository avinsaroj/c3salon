import type { Branch } from "./branches";

/** Brand-wide details. Phone, address, map, Instagram and prices are per branch: lib/branches.ts. */
export const SITE = {
  name: "C3 Unisex Salon",
  tagline: "Cut, Color & Care",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://c3unisexsalon.in",
} as const;

export const DEFAULT_WA_MESSAGE = "Hi C3 Unisex Salon, I would like to book an appointment.";

export function waLink(branch: Pick<Branch, "whatsapp">, message = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`;
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
