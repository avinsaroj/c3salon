import { Phone } from "lucide-react";
import { DEFAULT_WA_MESSAGE, SITE, bookHref, waLink } from "@/lib/site";
import { Magnetic, Reveal, SplitReveal } from "./motion";
import { Button, WhatsAppIcon } from "./ui";

export function CtaBand({
  lines = ["Ready for your", "next look?"],
  message = DEFAULT_WA_MESSAGE,
}: {
  lines?: string[];
  message?: string;
}) {
  return (
    <section aria-label="Book an appointment" className="container-lux py-16 md:py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center text-cream sm:px-12 md:py-24">
        <div aria-hidden className="absolute -left-24 -top-24 size-80 rounded-full bg-bronze/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-24 size-80 rounded-full bg-gold/20 blur-3xl" />
        <h2 className="display relative text-[clamp(2.6rem,7vw,5.5rem)]">
          <SplitReveal lines={lines} accent={lines.length - 1} accentClass="italic text-gold" />
        </h2>
        <Reveal delay={0.15} className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Magnetic>
            <Button href={bookHref()} variant="light" className="w-full sm:w-auto">Book Appointment</Button>
          </Magnetic>
          <Button href={waLink(message)} variant="outline-light">
            <WhatsAppIcon className="size-4" /> WhatsApp Us
          </Button>
          <Button href={`tel:${SITE.phone}`} variant="outline-light">
            <Phone className="size-4" aria-hidden /> Call Now
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
