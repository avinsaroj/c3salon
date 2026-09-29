import { PageHero } from "@/components/PageHero";
import { Pricing } from "@/components/Pricing";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/ui";
import { breadcrumbSchema, pageMeta } from "@/lib/schema";

export const metadata = pageMeta(
  "Price List",
  "C3 Unisex Salon Belgaum price list: haircuts, hair spa, global colour, highlights, protein and straightening, makeup, facials, waxing, nails and grooming.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Transparent pricing. Premium experience."
        lines={["Our price", "list"]}
        accent={1}
        intro="Clear prices for every service. For colour, highlights and treatments, the rate depends on your hair's length and density."
      />
      <Pricing />
      <CtaBand />
      <JsonLd data={breadcrumbSchema("Pricing", "/pricing")} />
    </>
  );
}
