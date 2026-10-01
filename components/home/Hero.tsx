"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";
import { IMG } from "@/lib/images";
import { EASE, bookHref, waLink } from "@/lib/site";
import type { BranchId } from "@/lib/branches";
import { findPrice, priceKey, startingPrice, type PriceTab } from "@/lib/pricing";
import { Magnetic, Marquee, RotatingBadge, SplitReveal } from "../motion";
import { Button, WhatsAppIcon } from "../ui";
import { useBranch } from "../Branch";

// Floating price badge: a line from each branch's live price list.
const BADGE: Record<BranchId, { label: string; key: string; from?: boolean }> = {
  belgaum: { label: "Bridal Makeup", key: priceKey("makeup", "Makeup", "Bridal Makeup"), from: true },
  kolhapur: { label: "Luxury Facial 24K Gold", key: priceKey("skin", "Skin · Facials", "Luxury Facial 24K Gold") },
};

export function Hero({ pricing }: { pricing: Record<BranchId, PriceTab[]> }) {
  const reduce = useReducedMotion();
  const { branch } = useBranch();
  const badge = BADGE[branch.id];
  const badgePrice = findPrice(pricing[branch.id], badge.key);
  const fade = (delay: number, y = 18) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <>
      <section className="relative isolate overflow-hidden">
        {/* soft ambient glow */}
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-nude/60 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 size-[30rem] rounded-full bg-sand blur-3xl" />

        <div className="container-lux grid items-center gap-14 pb-14 pt-28 md:pt-36 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-20">
          <div className="lg:col-span-6">
            <m.p
              {...fade(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-ink/80 backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-bronze [animation:ping-soft_2.4s_ease-out_infinite]" />
                <span className="relative size-2 rounded-full bg-bronze" />
              </span>
              Unisex Salon · {branch.name}
            </m.p>

            <h1 className="display mt-7 text-[clamp(3.4rem,9vw,7.5rem)]">
              <SplitReveal lines={["Look good.", "Feel confident."]} accent={1} onMount delay={0.15} />
            </h1>

            <m.p {...fade(0.55)} className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Premium Hair, Beauty &amp; Grooming Experience at C3 Unisex Salon
            </m.p>

            <m.div {...fade(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button href={bookHref()} className="w-full sm:w-auto">Book Appointment</Button>
              </Magnetic>
              <Button href="/services" variant="outline">Explore Services</Button>
            </m.div>

            <m.div {...fade(0.85)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              <a href={`tel:${branch.phone}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <Phone className="size-4" aria-hidden /> {branch.phoneDisplay}
              </a>
              <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
              <a href={waLink(branch)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <WhatsAppIcon className="size-4 text-[#1DA851]" /> WhatsApp us
              </a>
            </m.div>
          </div>

          {/* Image collage */}
          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
            <m.div
              className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[var(--shadow-soft)] lg:w-[78%]"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            >
              <m.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: EASE }}
              >
                <Image
                  src={IMG.heroPortrait.src}
                  alt={IMG.heroPortrait.alt}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width:1024px) 460px, 86vw"
                  className="object-cover object-[50%_20%]"
                />
              </m.div>
            </m.div>

            <m.div
              className="absolute bottom-6 left-0 w-[42%] overflow-hidden rounded-[1.5rem] border-[6px] border-cream shadow-[var(--shadow-soft)]"
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
            >
              <div className="relative aspect-square">
                <Image src={IMG.haircutMen.src} alt={IMG.haircutMen.alt} fill placeholder="blur" sizes="220px" className="object-cover" />
              </div>
            </m.div>

            <m.div
              className="absolute left-2 top-10 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[var(--shadow-soft)] backdrop-blur-md sm:left-4 lg:-left-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            >
              <div className="flex items-center gap-3 [animation:float_6s_ease-in-out_infinite]">
                <span className="grid size-10 place-items-center rounded-full bg-sand text-bronze">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-muted">{badge.label}</p>
                  {badgePrice && <p className="text-sm font-bold">{startingPrice(badgePrice, badge.from)}</p>}
                </div>
              </div>
            </m.div>

            <m.div
              className="absolute -bottom-2 right-0 text-ink sm:right-2"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: EASE }}
            >
              <div className="relative grid size-28 place-items-center rounded-full bg-cream shadow-[var(--shadow-soft)]">
                <RotatingBadge text="CUT · COLOR · CARE · C3 SALON · " className="absolute inset-0 size-full" />
                <span className="display text-3xl italic text-bronze">C3</span>
              </div>
            </m.div>
          </div>
        </div>

        <a
          href="#services"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] text-muted transition-colors hover:text-ink lg:flex"
        >
          SCROLL TO EXPLORE
          <span className="flex h-8 w-5 justify-center rounded-full border border-ink/25 pt-1.5" aria-hidden>
            <span className="size-1 rounded-full bg-ink [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
          </span>
        </a>
      </section>

      <div className="border-y border-line bg-sand/70 py-5">
        <Marquee
          className="display text-3xl italic text-ink/80 md:text-4xl"
          items={["Hair", "Colour", "Bridal", "Makeup", "Skin", "Grooming", "Nails", "Treatments"]}
        />
      </div>
    </>
  );
}
