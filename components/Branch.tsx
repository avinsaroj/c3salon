"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Check, ChevronDown, MapPin, X } from "lucide-react";
import { BRANCHES, BRANCH_COOKIE, DEFAULT_BRANCH, branchById, type Branch, type BranchId } from "@/lib/branches";
import type { PriceTab } from "@/lib/pricing";
import { EASE } from "@/lib/site";
import { Eyebrow } from "./ui";

const BranchContext = createContext<{ branch: Branch; select: (id: BranchId) => void }>({
  branch: DEFAULT_BRANCH,
  select: () => {},
});

/**
 * The chosen branch lives in a cookie so server components render the right
 * phone, address and prices on the first paint. Switching refreshes them.
 * `pricing` is every branch's live price list, so `branch.pricing` includes saved edits.
 */
export function BranchProvider({
  initial,
  pricing,
  children,
}: {
  initial: BranchId;
  pricing: Record<BranchId, PriceTab[]>;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [id, setId] = useState(initial);
  useEffect(() => setId(initial), [initial]);

  const select = (next: BranchId) => {
    document.cookie = `${BRANCH_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    if (next === id) return;
    setId(next);
    router.refresh();
  };

  return <BranchContext.Provider value={{ branch: { ...branchById(id), pricing: pricing[id] }, select }}>{children}</BranchContext.Provider>;
}

export function useBranch() {
  return useContext(BranchContext);
}

/** Pill-shaped branch picker; a native select keeps it accessible on every device. */
export function BranchSelect({ className = "" }: { className?: string }) {
  const { branch, select } = useBranch();
  return (
    <label className={`relative inline-flex min-h-11 items-center rounded-full border border-line bg-white/70 text-sm font-semibold text-ink backdrop-blur ${className}`}>
      <span className="sr-only">Choose branch</span>
      <MapPin className="pointer-events-none absolute left-3.5 hidden size-4 text-bronze sm:block" aria-hidden />
      <select
        value={branch.id}
        onChange={(e) => select(e.target.value as BranchId)}
        className="min-h-11 w-full cursor-pointer appearance-none rounded-full bg-transparent pl-4 pr-9 sm:pl-9"
      >
        {BRANCHES.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 size-4" aria-hidden />
    </label>
  );
}

/** Delay after the first page opens before visitors are asked to pick their branch. */
const PROMPT_DELAY_MS = 1000;

/**
 * Dialog asking which branch to show, opened only until the visitor makes a
 * choice. Any choice (including closing) writes the branch cookie, which is
 * what stops it reappearing on later pages and visits.
 */
export function BranchPrompt() {
  const { branch, select } = useBranch();
  const [open, setOpen] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const chosen = document.cookie.split("; ").some((c) => c.startsWith(`${BRANCH_COOKIE}=`));
    if (chosen) return;
    const t = window.setTimeout(() => setOpen(true), PROMPT_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const choose = (id: BranchId) => {
    select(id);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    firstButton.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && choose(branch.id);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => choose(branch.id)}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="branch-prompt-title"
            className="relative w-full max-w-md rounded-3xl bg-cream p-7 shadow-2xl sm:p-9"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => choose(branch.id)}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-line"
            >
              <X className="size-5" aria-hidden />
            </button>
            <Eyebrow>Welcome to C3</Eyebrow>
            <h2 id="branch-prompt-title" className="display mt-3 text-4xl">
              Choose your <span className="italic text-bronze">branch</span>
            </h2>
            <p className="mt-2 text-sm text-muted">We&apos;ll show the address, phone and prices for the salon you visit.</p>
            <ul className="mt-6 space-y-3">
              {BRANCHES.map((b, i) => (
                <li key={b.id}>
                  <button
                    ref={i === 0 ? firstButton : undefined}
                    type="button"
                    onClick={() => choose(b.id)}
                    className={`flex min-h-16 w-full items-center gap-4 rounded-2xl border px-5 py-3 text-left transition-colors ${
                      b.id === branch.id ? "border-ink bg-ink text-cream" : "border-line hover:border-ink"
                    }`}
                  >
                    <MapPin className="size-5 shrink-0 text-bronze" aria-hidden />
                    <span className="flex-1">
                      <span className="block font-semibold">{b.name}</span>
                      <span className={`block text-xs ${b.id === branch.id ? "text-cream/70" : "text-muted"}`}>
                        {b.city}, {b.region}
                      </span>
                    </span>
                    {b.id === branch.id && <Check className="size-5 shrink-0" aria-hidden />}
                  </button>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
