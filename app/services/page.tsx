import { PageHero } from "@/components/PageHero";
import { ServicesCatalog } from "@/components/ServicesCatalog";
import { CtaBand } from "@/components/CtaBand";
import { Button, JsonLd } from "@/components/ui";
import { IMG } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { bookHref } from "@/lib/site";
import { breadcrumbSchema, pageMeta, servicesSchema } from "@/lib/schema";

export const metadata = pageMeta(
  "Hair, Beauty, Skin & Grooming Services",
  "Haircuts, hair colour, highlights, protein and straightening, makeup, facials, waxing, threading and grooming for men and women at C3 Unisex Salon, Belgaum.",
  "/services",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Hair · Beauty · Skin · Grooming"
        lines={["Our", "services"]}
        accent={1}
        intro="Everything you need to look and feel your best, from a quick beard trim to a full hair transformation, under one roof in Belgaum."
        image={IMG.haircutMen}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={bookHref()}>Book Appointment</Button>
          <Button href="/pricing" variant="outline">View Price List</Button>
        </div>
      </PageHero>
      <ServicesCatalog />
      <CtaBand />
      <JsonLd data={servicesSchema(SERVICES)} />
      <JsonLd data={breadcrumbSchema("Services", "/services")} />
    </>
  );
}
