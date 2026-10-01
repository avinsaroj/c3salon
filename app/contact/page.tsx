import { MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BookingSection } from "@/components/BookingSection";
import { MapEmbed } from "@/components/MapEmbed";
import { Faq } from "@/components/Faq";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { Button, Instagram, JsonLd, WhatsAppIcon } from "@/components/ui";
import { IMG } from "@/lib/images";
import { faqsFor } from "@/lib/services";
import { waLink } from "@/lib/site";
import { getBranch } from "@/lib/branch-server";
import { BranchSelect } from "@/components/Branch";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/schema";

export const metadata = pageMeta(
  "Contact & Book an Appointment",
  "Book an appointment at C3 Unisex Salon in Belgaum or Kolhapur. Call your branch, message us on WhatsApp, or send a booking request online.",
  "/contact",
);

export default async function ContactPage() {
  const branch = await getBranch();
  const faqs = faqsFor(branch);
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
          <SectionHeading id="visit-h" eyebrow="Visit" lines={["Find us in", branch.name]} accent={1} />
          <div className="mt-6">
            <BranchSelect />
          </div>
          <Reveal>
            <address className="mt-8 space-y-3 not-italic">
              <p className="text-lg font-bold">C3 Unisex Salon · {branch.name}</p>
              <p className="text-muted">
                {branch.street}
                <br />
                {branch.city} {branch.postalCode}, {branch.region}
              </p>
              <p>
                <a href={`tel:${branch.phone}`} className="inline-flex items-center gap-2 font-medium hover:underline">
                  <Phone className="size-4" aria-hidden /> {branch.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={branch.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:underline">
                  <Instagram className="size-4" /> @{branch.instagram}
                </a>
              </p>
            </address>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={branch.directionsUrl}><MapPin className="size-4" aria-hidden /> Get Directions</Button>
            <Button href={`tel:${branch.phone}`} variant="outline"><Phone className="size-4" aria-hidden /> Call Us</Button>
            <Button href={waLink(branch)} variant="outline"><WhatsAppIcon className="size-4 text-[#1DA851]" /> WhatsApp</Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <MapEmbed />
        </Reveal>
      </section>

      <div className="bg-sand/50">
        <Faq items={faqs} />
      </div>

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
    </>
  );
}
