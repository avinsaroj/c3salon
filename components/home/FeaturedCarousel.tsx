"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IMG, type Photo } from "@/lib/images";
import { bookHref } from "@/lib/site";
import type { BranchId } from "@/lib/branches";
import { findPrice, priceKey, type PriceTab } from "@/lib/pricing";
import { useBranch } from "../Branch";
import { Reveal } from "../motion";
import { SectionHeading } from "../SectionHeading";

// "From" price is the live price list line named by `from`; a branch without that line shows none.
const FEATURED: { title: string; photo: Photo; desc: string; from: string; href: string; tag?: string }[] = [
  {
    title: "Bridal Makeup",
    photo: IMG.bridalBraid,
    desc: "A flawless, photogenic look for your wedding day, designed around you.",
    from: priceKey("makeup", "Makeup", "Bridal Makeup"),
    href: "/bridal",
    tag: "Signature",
  },
  {
    title: "Hair Color",
    photo: IMG.hairColor,
    desc: "Global colour and highlights blended for depth, dimension and shine.",
    from: priceKey("hair", "Global Color · Virgin Hair", "Shoulder length"),
    href: bookHref("Global Color"),
  },
  {
    title: "Hair Transformation",
    photo: IMG.hairWaves,
    desc: "Straightening and smoothing for sleek, manageable hair.",
    from: priceKey("hair", "Straightening Treatment", "Shoulder length"),
    href: bookHref("Straightening Treatment"),
  },
  {
    title: "Premium Facial",
    photo: IMG.skinGlow,
    desc: "Radiance-restoring skin care in a calm, unhurried setting.",
    from: priceKey("skin", "Skin · Facials", "Premium Facial"),
    href: bookHref("Premium Facial"),
  },
  {
    title: "Protein Treatment",
    photo: IMG.hairWoman,
    desc: "Strength and smoothness for tired, over-processed hair.",
    from: priceKey("hair", "Protein Treatment", "Shoulder length"),
    href: bookHref("Protein Treatment"),
  },
];

export function FeaturedCarousel({ pricing }: { pricing: Record<BranchId, PriceTab[]> }) {
  const track = useRef<HTMLUListElement>(null);
  const { branch } = useBranch();
  const from = FEATURED.map((f) => findPrice(pricing[branch.id], f.from));
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="featured-h" className="overflow-hidden py-20 md:py-28">
      <div className="container-lux">
        <SectionHeading
          id="featured-h"
          eyebrow="Featured"
          lines={["Signature", "services"]}
          accent={1}
          lead="The treatments our clients come back for."
          action={
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Previous services" className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-cream">
                <ArrowLeft className="size-5" aria-hidden />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Next services" className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-cream">
                <ArrowRight className="size-5" aria-hidden />
              </button>
            </div>
          }
        />
      </div>

      {/* Gutter aligns the first card with the page container; scroll-padding keeps snap from eating it. */}
      <ul
        ref={track}
        style={{ "--gutter": "max(1.25rem, calc((100vw - 1320px) / 2 + 2.5rem))" } as React.CSSProperties}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[var(--gutter)] pb-4 scroll-px-[var(--gutter)]"
      >
        {FEATURED.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.06} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[30%] xl:w-[27%]">
            <Link href={f.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand">
                <Image
                  src={f.photo.src}
                  alt={f.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 82vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105"
                />
                {f.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream">{f.tag}</span>
                )}
                {from[i] && (
                  <span className="absolute bottom-4 right-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-sm font-bold backdrop-blur">
                    From ₹{from[i].min}
                  </span>
                )}
              </div>
              <h3 className="display mt-5 text-3xl">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                {f.tag ? "Explore bridal" : "Book now"}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
