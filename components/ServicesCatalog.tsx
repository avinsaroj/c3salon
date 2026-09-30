"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, servicesFor, type CategoryId } from "@/lib/services";
import { EASE, bookHref } from "@/lib/site";
import { ArrowLink } from "./ui";
import { TabBar } from "./TabBar";
import { useBranch } from "./Branch";

type Filter = "all" | CategoryId;

export function ServicesCatalog() {
  const { branch } = useBranch();
  const services = servicesFor(branch.id);
  // Categories with nothing on this branch's rate card are left out.
  const categories = CATEGORIES.filter((c) => services.some((s) => s.category === c.id));
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c.id, label: c.title })),
  ];
  const [picked, setFilter] = useState<Filter>("all");
  const filter = filters.some((f) => f.id === picked) ? picked : "all";

  // /services#skin (from the home page) pre-selects that category.
  useEffect(() => {
    const hash = window.location.hash.slice(1) as CategoryId;
    if (CATEGORIES.some((c) => c.id === hash)) setFilter(hash);
  }, []);

  const list = services.filter((s) => filter === "all" || s.category === filter);
  const category = categories.find((c) => c.id === filter);

  return (
    <section aria-label="Service list" className="container-lux py-12 md:py-16">
      {/* Sticky on larger screens only; on phones the wrapped tab grid would cover too much. */}
      <div className="z-20 md:sticky md:top-[68px] md:-mx-5 md:bg-cream/90 md:px-5 md:py-3 md:backdrop-blur">
        <TabBar
          tabs={filters}
          active={filter}
          onChange={(id) => {
            setFilter(id);
            history.replaceState(null, "", id === "all" ? "/services" : `#${id}`);
          }}
          layoutId="svc-tab"
          label="Service categories"
        />
      </div>

      <AnimatePresence mode="wait">
        {category && (
          <m.div
            key={category.id}
            id={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-10 grid items-center gap-8 overflow-hidden rounded-[2rem] bg-sand/70 p-5 md:grid-cols-[280px_1fr] md:p-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:aspect-square">
              <Image src={category.image.src} alt={category.image.alt} fill placeholder="blur" sizes="280px" className="object-cover" />
            </div>
            <div className="md:pr-6">
              <p className="text-sm text-muted">{category.tagline}</p>
              <h2 className="display mt-1 text-5xl">{category.title}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{category.intro}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="rounded-full bg-cream px-4 py-2 text-sm font-bold">From {category.from[branch.id]}</span>
                <ArrowLink href={`/pricing#${category.pricingTab}`}>Full prices</ArrowLink>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((s) => {
            const cat = CATEGORIES.find((c) => c.id === s.category)!;
            return (
              <m.li
                layout
                key={s.name}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Link
                  href={bookHref(s.name)}
                  className="group flex h-full min-h-[210px] flex-col justify-between rounded-[1.5rem] border border-line bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-bronze">{cat.title}</span>
                    <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="display text-[1.7rem] leading-tight">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.blurb}</p>
                    <p className="mt-4 text-sm">
                      <span className="text-muted">From </span>
                      <span className="font-bold">{s.from}</span>
                    </p>
                  </div>
                </Link>
              </m.li>
            );
          })}
        </AnimatePresence>
      </m.ul>
    </section>
  );
}
