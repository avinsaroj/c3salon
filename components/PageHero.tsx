"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE } from "@/lib/site";
import type { Photo } from "@/lib/images";
import { ImageReveal, SplitReveal } from "./motion";
import { Eyebrow } from "./ui";

type Props = {
  crumb: string;
  eyebrow: string;
  lines: string[];
  accent?: number;
  intro: string;
  image?: Photo;
  /** "portrait" for tall photos, "landscape" for wide ones. */
  shape?: "portrait" | "landscape";
  children?: React.ReactNode;
};

export function PageHero({ crumb, eyebrow, lines, accent, intro, image, shape = "landscape", children }: Props) {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative isolate overflow-hidden bg-sand/60">
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[36rem] rounded-full bg-nude/60 blur-3xl" />
      <div className="container-lux grid items-center gap-12 pb-14 pt-28 md:pb-16 md:pt-36 lg:grid-cols-12">
        <div className={image ? "lg:col-span-6" : "lg:col-span-9"}>
          <m.nav {...fade(0)} aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li aria-current="page" className="font-medium text-ink">{crumb}</li>
            </ol>
          </m.nav>
          <m.div {...fade(0.05)} className="mt-8">
            <Eyebrow>{eyebrow}</Eyebrow>
          </m.div>
          <h1 className="display mt-5 text-[clamp(3rem,8vw,6.5rem)]">
            <SplitReveal lines={lines} accent={accent} onMount delay={0.1} />
          </h1>
          <m.p {...fade(0.45)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {intro}
          </m.p>
          {children && (
            <m.div {...fade(0.6)} className="mt-9">
              {children}
            </m.div>
          )}
        </div>

        {image && (
          <div className="lg:col-span-6">
            <ImageReveal
              image={image}
              priority
              className={`mx-auto w-full rounded-[2rem] shadow-[var(--shadow-soft)] ${
                shape === "portrait" ? "aspect-[4/5] max-w-[440px] rounded-t-[999px]" : "aspect-[4/3] max-w-[600px]"
              }`}
              sizes="(min-width:1024px) 600px, 92vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
