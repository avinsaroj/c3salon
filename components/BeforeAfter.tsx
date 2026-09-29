"use client";

import Image from "next/image";
import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { TabBar } from "./TabBar";

type Item = { id: string; label: string; before?: string; after?: string };

/**
 * Add real client photos (with consent) via before/after paths, e.g.
 * "/images/hair-before.webp". Stock imagery must never be used here.
 */
const ITEMS: Item[] = [
  { id: "hair", label: "Hair" },
  { id: "makeup", label: "Makeup" },
  { id: "color", label: "Hair Color" },
  { id: "styling", label: "Styling" },
];

function Slider({ item }: { item: Item }) {
  const [pos, setPos] = useState(50);
  const hasPhotos = item.before && item.after;

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl select-none overflow-hidden rounded-[1.5rem] bg-sand sm:aspect-[16/9] md:rounded-[2rem]">
      {hasPhotos ? (
        <Image src={item.after!} alt={`${item.label} after`} fill sizes="(min-width:768px) 900px, 100vw" className="object-cover" />
      ) : (
        <div role="img" aria-label={`${item.label} after`} className="absolute inset-0 bg-[linear-gradient(135deg,#e8dccd,#d9bf8c)]" />
      )}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {hasPhotos ? (
          <Image src={item.before!} alt={`${item.label} before`} fill sizes="(min-width:768px) 900px, 100vw" className="object-cover" />
        ) : (
          <div role="img" aria-label={`${item.label} before`} className="absolute inset-0 bg-[linear-gradient(135deg,#f3ece3,#e8dccd)]" />
        )}
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold">Before</span>
      <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream">After</span>

      {!hasPhotos && (
        <p className="display absolute inset-x-6 bottom-8 text-center text-2xl text-ink/70 md:text-3xl">
          Real client transformations coming soon
        </p>
      )}

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-cream" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-lg" aria-hidden>
          <MoveHorizontal className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${item.label} before and after comparison`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState(ITEMS[0].id);
  const item = ITEMS.find((i) => i.id === active)!;
  return (
    <section aria-labelledby="ba-h" className="container-lux py-20 md:py-28">
      <SectionHeading id="ba-h" eyebrow="Transformations" lines={["Your transformation", "starts here"]} accent={1} center />

      <div className="mt-8">
        <TabBar tabs={ITEMS} active={active} onChange={setActive} layoutId="ba-tab" label="Transformation type" />
      </div>

      <div className="mt-8" key={item.id}>
        <Slider item={item} />
      </div>
    </section>
  );
}
