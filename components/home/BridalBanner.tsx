import { IMG } from "@/lib/images";
import { waLink } from "@/lib/site";
import { hasMakeup } from "@/lib/branches";
import { getBranch } from "@/lib/branch-server";
import { getPricing } from "@/lib/price-store";
import { findPrice, formatPrice, priceKey } from "@/lib/pricing";
import { ImageReveal, Reveal, SplitReveal } from "../motion";
import { Button, Eyebrow, WhatsAppIcon } from "../ui";

// "<look> Makeup" lines from the live price list (Belgaum makeup; the Kolhapur card has none). Each applies to a single look.
const LOOKS = ["Pre-Wedding", "Haldi", "Engagement", "Bridal"];

export async function BridalBanner() {
  const branch = await getBranch();
  const pricing = (await getPricing())[branch.id];
  const looks = LOOKS.map((name) => ({ name, price: findPrice(pricing, priceKey("makeup", "Makeup", `${name} Makeup`)) }));
  return (
    <section aria-labelledby="bridal-h" className="container-lux py-12 md:py-16">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-ink text-cream lg:grid-cols-2">
        <ImageReveal image={IMG.bridalBouquet} className="aspect-[4/3] lg:aspect-auto lg:min-h-[560px]" sizes="(min-width:1024px) 50vw, 100vw" imgClassName="object-[50%_30%]" />
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <Eyebrow className="!text-gold">Bridal & occasion makeup</Eyebrow>
          <h2 id="bridal-h" className="display mt-5 text-[clamp(2.6rem,5.5vw,4.5rem)]">
            <SplitReveal lines={["Your day.", "Your look."]} accent={1} accentClass="italic text-gold" />
          </h2>
          <Reveal className="mt-5 max-w-md leading-relaxed text-cream/70">
            From haldi to the wedding day, makeup designed around you and made to last through every photograph.
          </Reveal>
          <Reveal delay={0.1}>
            {hasMakeup(branch) ? (
              <>
                <ul className="mt-8 grid grid-cols-2 gap-3">
                  {looks.map((l) => (
                    <li key={l.name} className={`rounded-2xl border p-4 ${l.name === "Bridal" ? "border-gold/50 bg-gold/10" : "border-cream/10"}`}>
                      <p className="text-sm text-cream/60">{l.name}</p>
                      {l.price && <p className="mt-1 text-xl font-bold">{formatPrice(l.price)}</p>}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-cream/50">Prices apply to a single look. Additional looks are charged separately.</p>
              </>
            ) : (
              <p className="mt-8 max-w-md rounded-2xl border border-cream/10 p-4 text-sm text-cream/70">
                Makeup isn’t on the {branch.name} rate card yet. Message us to check availability and prices.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/bridal" variant="light">Explore Bridal</Button>
            <Button href={waLink(branch, "Hi C3 Unisex Salon, I would like to enquire about bridal makeup.")} variant="outline-light">
              <WhatsAppIcon className="size-4" /> Enquire
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
