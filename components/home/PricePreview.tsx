import { Reveal } from "../motion";
import { Button } from "../ui";
import { SectionHeading } from "../SectionHeading";

/** A few anchor prices, all from lib/pricing.ts (the printed price list). */
const HIGHLIGHTS = [
  { name: "Men's Hair Cut", price: "₹150" },
  { name: "Ladies Hair Cut", price: "₹600" },
  { name: "Hair Spa", price: "from ₹500" },
  { name: "Global Color", price: "from ₹2500" },
  { name: "Premium Facial", price: "₹2000" },
  { name: "Premium Manicure", price: "₹500" },
  { name: "Eyebrows (threading)", price: "₹50" },
  { name: "Bridal Makeup", price: "₹8000" },
];

export function PricePreview() {
  return (
    <section aria-labelledby="pp-h" className="bg-sand/50 py-20 md:py-28">
      <div className="container-lux grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading
            id="pp-h"
            eyebrow="Price list"
            lines={["Our price", "list"]}
            accent={1}
            lead="Transparent pricing. Premium experience. Colour and treatments are priced by hair length and density."
          />
          <Reveal className="mt-8">
            <Button href="/pricing">View full price list</Button>
          </Reveal>
        </div>

        <Reveal className="rounded-[2rem] bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:col-span-7">
          <ul>
            {HIGHLIGHTS.map((h) => (
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
