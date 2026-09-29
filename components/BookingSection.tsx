import { Suspense } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { BookingForm } from "./BookingForm";
import { Reveal, SplitReveal } from "./motion";
import { Button, Eyebrow, Instagram, WhatsAppIcon } from "./ui";

export function BookingSection() {
  return (
    <section id="book" aria-labelledby="book-h" className="bg-ink py-24 text-cream md:py-32">
      <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow className="!text-gold">Book</Eyebrow>
          <h2 id="book-h" className="display mt-5 text-[clamp(2.8rem,6vw,5rem)]">
            <SplitReveal lines={["Ready for your", "next look?"]} accent={1} accentClass="italic text-gold" />
          </h2>
          <Reveal className="mt-6 max-w-md leading-relaxed text-cream/70">
            Send a request and we’ll confirm your appointment, or reach us directly.
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={waLink()} variant="light">
              <WhatsAppIcon className="size-4 text-[#1DA851]" /> WhatsApp Us
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="outline-light">
              <Phone className="size-4" aria-hidden /> Call Now
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-12 space-y-4 text-sm text-cream/70">
              <li className="flex items-center gap-3"><MapPin className="size-4 text-gold" aria-hidden /> C3 Unisex Salon, Belgaum</li>
              <li className="flex items-center gap-3"><Phone className="size-4 text-gold" aria-hidden /> {SITE.phoneDisplay}</li>
              <li className="flex items-center gap-3"><Instagram className="size-4 text-gold" /> @{SITE.instagram}</li>
              <li className="flex items-center gap-3"><Clock className="size-4 text-gold" aria-hidden /> Call or WhatsApp to check today’s availability</li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Suspense>
            <BookingForm />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
