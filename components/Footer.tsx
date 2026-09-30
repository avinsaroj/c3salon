import Link from "next/link";
import { Phone } from "lucide-react";
import { NAV, SITE, bookHref, waLink } from "@/lib/site";
import { getBranch } from "@/lib/branch-server";
import { Logo } from "./Logo";
import { Button, Instagram, WhatsAppIcon } from "./ui";

export async function Footer() {
  const branch = await getBranch();
  return (
    <footer className="border-t border-cream/10 bg-ink pb-28 pt-16 text-cream md:pb-10 md:pt-20">
      <div className="container-lux">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="w-44 text-logo" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Premium hair, beauty and grooming for women, men and families in Belgaum and Kolhapur.
            </p>
            <Button href={bookHref()} variant="light" className="mt-6">Book Appointment</Button>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-5 text-cream/45">Explore</h2>
            <ul className="space-y-3 text-sm text-cream/75">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-gold">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 text-cream/45">Visit · {branch.name}</h2>
            <address className="space-y-3 text-sm not-italic text-cream/75">
              <p>
                C3 Unisex Salon<br />
                {branch.street}<br />
                {branch.city} {branch.postalCode}, {branch.region}
              </p>
              <p>
                <a href={`tel:${branch.phone}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold">
                  <Phone className="size-4" aria-hidden /> {branch.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={branch.directionsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  Get directions ↗
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="eyebrow mb-5 text-cream/45">Follow</h2>
            <div className="flex gap-3">
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="C3 Unisex Salon on Instagram" className="grid size-11 place-items-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold">
                <Instagram className="size-5" />
              </a>
              <a href={waLink(branch)} target="_blank" rel="noopener noreferrer" aria-label="Chat with C3 Unisex Salon on WhatsApp" className="grid size-11 place-items-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold">
                <WhatsAppIcon className="size-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-cream/60">@{SITE.instagram}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-cream/10 pt-8 text-sm text-cream/45 sm:flex-row">
          <p>© 2026 C3 Unisex Salon. All Rights Reserved.</p>
          <a href="#main" className="transition-colors hover:text-gold">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
