import { Reveal } from "../motion";
import { Button } from "../ui";
import { SectionHeading } from "../SectionHeading";
import { getBranch } from "@/lib/branch-server";
import { getPricing } from "@/lib/price-store";
import type { BranchId } from "@/lib/branches";
import { findPrice, priceKey, startingPrice } from "@/lib/pricing";

/**
 * A few anchor prices, each a line in the live price list. `key` is per branch
 * where the cards name a line differently; a branch without the line skips the row.
 */
const HIGHLIGHTS: { name: string; key: string | Record<BranchId, string>; from?: boolean }[] = [
  {
    name: "Men's Hair Cut",
    key: { belgaum: priceKey("hair", "Hair Cut", "Men's Hair Cut"), kolhapur: priceKey("hair", "Hair Cut", "Adult Hair Cut") },
  },
  { name: "Ladies Hair Cut", key: priceKey("hair", "Hair Cut", "Ladies Hair Cut") },
  { name: "Hair Spa", key: priceKey("hair", "Hair Spa", "Gents"), from: true },
  { name: "Global Color", key: priceKey("hair", "Global Color · Virgin Hair", "Shoulder length"), from: true },
  { name: "Premium Facial", key: priceKey("skin", "Skin · Facials", "Premium Facial") },
  { name: "Premium Manicure", key: priceKey("nails", "Manicure & Pedicure", "Premium Manicure") },
  { name: "Eyebrows (threading)", key: priceKey("grooming", "Threading", "Eyebrows") },
  { name: "Bridal Makeup", key: priceKey("makeup", "Makeup", "Bridal Makeup") },
];

export async function PricePreview() {
  const branch = await getBranch();
  const pricing = (await getPricing())[branch.id];
  const rows = HIGHLIGHTS.flatMap((h) => {
    const price = findPrice(pricing, typeof h.key === "string" ? h.key : h.key[branch.id]);
    return price ? [{ name: h.name, price: startingPrice(price, h.from) }] : [];
  });
  return (
    <section aria-labelledby="pp-h" className="bg-sand/50 py-20 md:py-28">
      <div className="container-lux grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading
            id="pp-h"
            eyebrow="Price list"
            lines={["Our price", "list"]}
            accent={1}
            lead={`Transparent pricing at our ${branch.name} branch. Colour and treatments are priced by hair length and density.`}
          />
          <Reveal className="mt-8">
            <Button href="/pricing">View full price list</Button>
          </Reveal>
        </div>

        <Reveal className="rounded-[2rem] bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:col-span-7">
          <ul>
            {rows.map((h) => (
              <li key={h.name} className="flex items-baseline gap-3 border-b border-line py-4 last:border-0">
                <span className="font-medium">{h.name}</span>
                <span className="mb-1 flex-1 self-end border-b border-dotted border-ink/20" aria-hidden />
                <span className="shrink-0 font-bold tabular-nums">{h.price}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
