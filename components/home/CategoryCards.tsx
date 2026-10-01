import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/services";
import { getBranch } from "@/lib/branch-server";
import { getPricing } from "@/lib/price-store";
import { lowestPrice } from "@/lib/pricing";
import { Reveal } from "../motion";
import { ArrowLink } from "../ui";
import { SectionHeading } from "../SectionHeading";

export async function CategoryCards() {
  const branch = await getBranch();
  const pricing = (await getPricing())[branch.id];
  // Cheapest line in each category's price list tab.
  const from = CATEGORIES.map((c) => lowestPrice(pricing, c.pricingTab));
  return (
    <section id="services" aria-labelledby="services-h" className="container-lux py-20 md:py-28">
      <SectionHeading
        id="services-h"
        eyebrow="Our services"
        lines={["Everything you need,", "under one roof."]}
        accent={1}
        lead="Hair, beauty, skin and grooming for women, men and the whole family."
        action={<ArrowLink href="/services">View all services</ArrowLink>}
      />

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <Reveal as="li" key={c.id} delay={i * 0.08}>
            <Link href={`/services#${c.id}`} className="group relative block overflow-hidden rounded-[1.75rem] bg-sand">
              <div className="relative aspect-[3/4]">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[0.7rem] font-semibold backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
                {from[i] !== undefined ? `From ₹${from[i]}` : "Price on request"}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-cream sm:p-6">
                <div>
                  <h3 className="display text-3xl sm:text-4xl">{c.title}</h3>
                  <p className="mt-1 hidden text-sm text-cream/80 sm:block">{c.tagline}</p>
                </div>
                <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-cream text-ink transition-transform duration-300 group-hover:rotate-45 sm:grid">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
