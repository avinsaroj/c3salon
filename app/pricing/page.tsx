import { PageHero } from "@/components/PageHero";
import { Pricing } from "@/components/Pricing";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/ui";
import { getPricing } from "@/lib/price-store";
import { breadcrumbSchema, pageMeta } from "@/lib/schema";

export const metadata = pageMeta(
  "Price List",
  "C3 Unisex Salon price lists for Belgaum and Kolhapur: haircuts, hair spa, global colour, highlights, protein and straightening, makeup, facials, waxing, nails and grooming.",
  "/pricing",
);

export default async function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Transparent pricing. Premium experience."
        lines={["Our price", "list"]}
        accent={1}
        intro="Clear prices for every service at each branch. For colour, highlights and treatments, the rate depends on your hair's length and density."
      />
      <Pricing pricing={await getPricing()} />
      <CtaBand />
      <JsonLd data={breadcrumbSchema("Pricing", "/pricing")} />
    </>
  );
}
