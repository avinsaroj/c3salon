"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import { PRICING, LENGTH_NOTE, formatPrice, type Group } from "@/lib/pricing";
import { EASE } from "@/lib/site";
import { TabBar } from "./TabBar";

function PriceLine({ label, price, note }: { label: string; price: string; note?: string }) {
  return (
    <li className="flex items-baseline gap-3 py-3">
      <span className="min-w-0 text-[0.95rem]">
        {label}
        {note && <span className="block text-xs text-muted">{note}</span>}
      </span>
      <span className="mb-1 min-w-4 flex-1 self-end border-b border-dotted border-ink/20" aria-hidden />
      <span className="shrink-0 font-bold tabular-nums">{price}</span>
    </li>
  );
}

function PricingCategory({ group, initialOpen, expandAll }: { group: Group; initialOpen: boolean; expandAll: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  useEffect(() => {
    if (expandAll) setOpen(true);
  }, [expandAll]);
  const id = `pg-${group.title.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div className="mb-4 break-inside-avoid rounded-[1.5rem] border border-line bg-white/70 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-4 text-left"
        >
          <span className="display text-2xl md:text-[1.7rem]">{group.title}</span>
          <span className={`grid size-9 shrink-0 place-items-center rounded-full bg-sand transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <ChevronDown className="size-4" aria-hidden />
          </span>
        </button>
      </h3>
      <div
        id={id}
        role="region"
        aria-label={group.title}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-lux)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="border-t border-line px-6 pb-6 pt-2">
            <ul>
              {group.rows?.map((r) => (
                <PriceLine key={r.name} label={r.name} note={r.note} price={formatPrice(r.price)} />
              ))}
              {group.tiers?.map((t) => (
                <PriceLine key={t.label} label={t.label} price={formatPrice(t.price)} />
              ))}
            </ul>
            {(group.lengthNote || group.note) && (
              <p className="mt-3 flex gap-2 rounded-xl bg-sand/70 px-3 py-2.5 text-xs leading-relaxed text-muted">
                <Info className="mt-px size-3.5 shrink-0" aria-hidden />
                {group.lengthNote ? LENGTH_NOTE : group.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [tab, setTab] = useState(PRICING[0].id);
  const [desktop, setDesktop] = useState(false);
  const current = PRICING.find((t) => t.id === tab)!;

  useEffect(() => {
    // Deep links such as /pricing#makeup open the matching tab.
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (PRICING.some((t) => t.id === hash)) setTab(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    // On larger screens every group starts expanded; phones get accordions.
    const mq = window.matchMedia("(min-width: 768px)");
    setDesktop(mq.matches);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="prices" aria-label="Price list" className="container-lux py-16 md:py-24">
      <TabBar
        tabs={PRICING.map((t) => ({ id: t.id, label: t.label }))}
        active={tab}
        onChange={(id) => {
          setTab(id);
          history.replaceState(null, "", `#${id}`);
        }}
        layoutId="price-tab"
        label="Price categories"
        controls="price-panel"
      />

      <AnimatePresence mode="wait">
        <m.div
          key={tab}
          id="price-panel"
          role="tabpanel"
          aria-labelledby={`price-tab-${tab}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`mx-auto mt-10 ${current.groups.length > 1 ? "max-w-5xl columns-1 gap-4 lg:columns-2" : "max-w-2xl"}`}
        >
          {current.groups.map((g, i) => (
            <PricingCategory key={g.title} group={g} initialOpen={i < 2} expandAll={desktop} />
          ))}
        </m.div>
      </AnimatePresence>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
        All prices in Indian Rupees (₹). For colour, highlights, protein and straightening, final rates depend on hair length and density.
      </p>
    </section>
  );
}
