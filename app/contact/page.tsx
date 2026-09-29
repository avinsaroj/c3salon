import { MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BookingSection } from "@/components/BookingSection";
import { MapEmbed } from "@/components/MapEmbed";
import { Faq } from "@/components/Faq";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { Button, Instagram, JsonLd, WhatsAppIcon } from "@/components/ui";
import { IMG } from "@/lib/images";
import { FAQS } from "@/lib/services";
import { SITE, waLink } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/schema";

export const metadata = pageMeta(
  "Contact & Book an Appointment",
  "Book an appointment at C3 Unisex Salon, Belgaum. Call +91 99021 06797, message us on WhatsApp, or send a booking request online.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Book · Call · WhatsApp"
        lines={["Visit C3", "Unisex Salon"]}
        accent={1}
        intro="Send a booking request, message us on WhatsApp or give us a call, and our team will confirm your appointment."
        image={IMG.salonTools}
      />

      <BookingSection />

      <section aria-labelledby="visit-h" className="container-lux grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="visit-h" eyebrow="Visit" lines={["Find us in", "Belgaum"]} accent={1} />
          <Reveal>
            <address className="mt-8 space-y-3 not-italic">
              <p className="text-lg font-bold">C3 Unisex Salon</p>
              <p className="text-muted">Belgaum, Karnataka</p>
              <p>
                <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 font-medium hover:underline">
                  <Phone className="size-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:underline">
                  <Instagram className="size-4" /> @{SITE.instagram}
                </a>
              </p>
            </address>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={SITE.directionsUrl}><MapPin className="size-4" aria-hidden /> Get Directions</Button>
            <Button href={`tel:${SITE.phone}`} variant="outline"><Phone className="size-4" aria-hidden /> Call Us</Button>
            <Button href={waLink()} variant="outline"><WhatsAppIcon className="size-4 text-[#1DA851]" /> WhatsApp</Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <MapEmbed />
        </Reveal>
      </section>

      <div className="bg-sand/50">
        <Faq items={FAQS} />
      </div>

      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
    </>
  );
}
