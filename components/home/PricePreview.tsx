import { Reveal } from "../motion";
import { Button } from "../ui";
import { SectionHeading } from "../SectionHeading";
import { getBranch } from "@/lib/branch-server";
import type { Prices } from "@/lib/branches";

/** A few anchor prices per branch, all from lib/pricing.ts (the printed price lists). */
const HIGHLIGHTS: { name: string; price: Prices }[] = [
  { name: "Men's Hair Cut", price: { belgaum: "₹150", kolhapur: "₹250" } },
  { name: "Ladies Hair Cut", price: { belgaum: "₹600", kolhapur: "₹600" } },
  { name: "Hair Spa", price: { belgaum: "from ₹500", kolhapur: "from ₹800" } },
  { name: "Global Color", price: { belgaum: "from ₹2500", kolhapur: "from ₹3000" } },
  { name: "Premium Facial", price: { belgaum: "₹2000", kolhapur: "₹2200" } },
  { name: "Premium Manicure", price: { belgaum: "₹500", kolhapur: "₹700" } },
  { name: "Eyebrows (threading)", price: { belgaum: "₹50", kolhapur: "₹50" } },
  { name: "Bridal Makeup", price: { belgaum: "₹8000" } },
];

export async function PricePreview() {
  const branch = await getBranch();
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
            {HIGHLIGHTS.filter((h) => h.price[branch.id]).map((h) => (
              <li key={h.name} className="flex items-baseline gap-3 border-b border-line py-4 last:border-0">
                <span className="font-medium">{h.name}</span>
                <span className="mb-1 flex-1 self-end border-b border-dotted border-ink/20" aria-hidden />
                <span className="shrink-0 font-bold tabular-nums">{h.price[branch.id]}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
