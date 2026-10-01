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

const MENU_ALIGN = {
  left: "left-0 origin-top-left",
  right: "right-0 origin-top-right",
  center: "left-1/2 -translate-x-1/2 origin-top",
};

/**
 * Pill-shaped branch picker that opens a listbox of branches with their city.
 * Follows the ARIA listbox pattern: arrows, Home/End, Enter/Space and Escape.
 */
export function BranchSelect({ className = "", align = "left" }: { className?: string; align?: keyof typeof MENU_ALIGN }) {
  const { branch, select } = useBranch();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const show = () => {
    setActive(Math.max(0, BRANCHES.findIndex((b) => b.id === branch.id)));
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };
  const choose = (id: BranchId) => {
    select(id);
    close();
  };

  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && close(false);
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onListKey = (e: React.KeyboardEvent) => {
    const last = BRANCHES.length - 1;
    const moves: Record<string, () => void> = {
      ArrowDown: () => setActive((i) => Math.min(i + 1, last)),
      ArrowUp: () => setActive((i) => Math.max(i - 1, 0)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(BRANCHES[active].id),
      " ": () => choose(BRANCHES[active].id),
      Escape: () => close(),
      Tab: () => close(false),
    };
    const move = moves[e.key];
    if (!move) return;
    if (e.key !== "Tab") e.preventDefault();
    move();
  };

  return (
    <div ref={root} className={`relative inline-block ${className}`}>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Branch: ${branch.name}. Change branch`}
        onClick={() => (open ? close() : show())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            show();
          }
        }}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border bg-white/70 pl-4 pr-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors sm:pl-3.5 ${
          open ? "border-ink" : "border-line hover:border-ink"
        }`}
      >
        <MapPin className="hidden size-4 text-bronze sm:block" aria-hidden />
        {branch.name}
        <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            ref={list}
            role="listbox"
            tabIndex={-1}
            aria-label="Choose branch"
            aria-activedescendant={`branch-opt-${BRANCHES[active].id}`}
            onKeyDown={onListKey}
            className={`absolute top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-cream p-1.5 shadow-xl outline-none ${MENU_ALIGN[align]}`}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {BRANCHES.map((b, i) => {
              const selected = b.id === branch.id;
              return (
                <li
                  key={b.id}
                  id={`branch-opt-${b.id}`}
                  role="option"
                  aria-selected={selected}
                  onClick={() => choose(b.id)}
                  onPointerEnter={() => setActive(i)}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                    selected ? "bg-ink text-cream" : i === active ? "bg-sand" : ""
                  }`}
                >
                  <MapPin className="size-4 shrink-0 text-bronze" aria-hidden />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{b.name}</span>
                    <span className={`block text-xs ${selected ? "text-cream/70" : "text-muted"}`}>
                      {b.city}, {b.region}
                    </span>
                  </span>
                  {selected && <Check className="size-4 shrink-0" aria-hidden />}
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
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
