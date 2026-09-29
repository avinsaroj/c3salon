"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { IMG, type Photo } from "@/lib/images";
import { EASE } from "@/lib/site";
import { TabBar } from "./TabBar";

const TABS = ["All", "Hair", "Makeup", "Bridal", "Skin", "Salon"] as const;
type Tab = (typeof TABS)[number];

/** Tile footprint in the bento grid: normal (1×1), tall (1×2) or wide (2×1). */
type Span = "n" | "t" | "w";
const SPAN: Record<Span, string> = { n: "", t: "row-span-2", w: "col-span-2" };

/**
 * Mood imagery (CC0). Swap in the salon's own work as it becomes available.
 * Portrait photos take tall tiles and landscape photos wide tiles. The order is
 * deliberate: with dense auto-placement it fills an exact 4×7 rectangle on
 * desktop and 2×14 on phones, so the grid never ends with holes. Keep the
 * pattern (5 tall, 4 wide, 10 normal in this sequence) when swapping photos.
 */
const ITEMS: { cat: Exclude<Tab, "All">; photo: Photo; span: Span }[] = [
  { cat: "Bridal", photo: IMG.bridalBraid, span: "t" },
  { cat: "Hair", photo: IMG.hairWoman, span: "n" },
  { cat: "Makeup", photo: IMG.makeupArtist, span: "w" },
  { cat: "Skin", photo: IMG.facialSerum, span: "n" },
  { cat: "Salon", photo: IMG.salonInterior, span: "n" },
  { cat: "Hair", photo: IMG.haircutWomen, span: "t" },
  { cat: "Makeup", photo: IMG.makeupEyes, span: "n" },
  { cat: "Skin", photo: IMG.skinPortrait, span: "t" },
  { cat: "Hair", photo: IMG.haircutMen, span: "n" },
  { cat: "Hair", photo: IMG.hairWaves, span: "n" },
  { cat: "Bridal", photo: IMG.bridalDetail, span: "w" },
  { cat: "Salon", photo: IMG.barber, span: "t" },
  { cat: "Skin", photo: IMG.skinCare, span: "n" },
  { cat: "Hair", photo: IMG.hairColor, span: "n" },
  { cat: "Bridal", photo: IMG.bridalBouquet, span: "t" },
  { cat: "Makeup", photo: IMG.makeupTools, span: "w" },
  { cat: "Salon", photo: IMG.massage, span: "w" },
  { cat: "Salon", photo: IMG.nails, span: "n" },
  { cat: "Skin", photo: IMG.skinGlow, span: "n" },
];

export function GalleryGrid() {
  const [tab, setTab] = useState<Tab>("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = ITEMS.filter((i) => tab === "All" || i.cat === tab);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + items.length) % items.length));

  return (
    <section aria-label="Gallery" className="container-lux py-12 md:py-16">
      <TabBar
        tabs={TABS.map((t) => ({ id: t, label: t }))}
        active={tab}
        onChange={setTab}
        layoutId="gallery-tab"
        label="Gallery categories"
      />

      <m.ul
        layout
        className="mt-8 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:mt-10 md:grid-cols-4 md:gap-4 lg:auto-rows-[230px]"
      >
        <AnimatePresence mode="popLayout">
          {items.map((it, i) => (
            <m.li
              layout
              key={it.photo.alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE }}
              // Filtered subsets use uniform tiles so they can't leave gaps.
              className={tab === "All" ? SPAN[it.span] : ""}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open image: ${it.photo.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-[1.25rem] bg-sand md:rounded-[1.5rem]"
              >
                <Image
                  src={it.photo.src}
                  alt={it.photo.alt}
                  fill
                  placeholder="blur"
                  sizes={tab === "All" && it.span === "w" ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/60 via-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-4">
                  <span className="rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold">{it.cat}</span>
                  <Expand className="size-5 text-cream" aria-hidden />
                </span>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label="Image viewer"
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-cream"
      >
        {open !== null && items[open] && (
          <div className="relative flex h-full w-full items-center justify-center p-4 md:p-16" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <m.div
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative h-full max-h-[80vh] w-full max-w-3xl"
            >
              <Image src={items[open].photo.src} alt={items[open].photo.alt} fill sizes="90vw" className="rounded-2xl object-contain" />
            </m.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-2 text-xs font-semibold">
              {open + 1} / {items.length} · {items[open].cat}
            </p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" autoFocus className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-cream/10 hover:bg-cream hover:text-ink">
              <X aria-hidden />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 hover:bg-cream hover:text-ink md:left-6">
              <ChevronLeft aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 hover:bg-cream hover:text-ink md:right-6">
              <ChevronRight aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
