"use client";

import { m } from "framer-motion";
import { EASE } from "@/lib/site";

type Tab<T extends string> = { id: T; label: string };

/**
 * Segmented pill control with a sliding active indicator. With more than four
 * options it wraps into a 3-column grid on phones so no tab is ever cut off.
 */
export function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  layoutId,
  label,
  controls,
}: {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
  layoutId: string;
  label: string;
  controls?: string;
}) {
  const wrap = tabs.length > 4;
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`mx-auto gap-1 border border-line bg-white/70 p-1 ${
        wrap ? "grid max-w-sm grid-cols-3 rounded-3xl sm:flex sm:w-max sm:max-w-none sm:rounded-full" : "flex w-max max-w-full rounded-full"
      }`}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          type="button"
          id={`${layoutId}-${t.id}`}
          aria-selected={active === t.id}
          aria-controls={controls}
          onClick={() => onChange(t.id)}
          className={`relative isolate min-h-11 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
            active === t.id ? "text-cream" : "text-ink/70 hover:text-ink"
          }`}
        >
          {active === t.id && (
            <m.span layoutId={layoutId} className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ duration: 0.45, ease: EASE }} />
          )}
          {t.label}
        </button>
      ))}
    </div>
  );
}
