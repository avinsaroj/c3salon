"use client";

import { useActionState, useState } from "react";
import { savePrices } from "@/app/price-admin/[key]/actions";
import { BRANCHES, type Branch, type BranchId } from "@/lib/branches";
import { priceKey, type Price, type PriceTab } from "@/lib/pricing";
import { TabBar } from "./TabBar";

const field =
  "w-24 rounded-xl border border-line bg-sand/60 px-3 py-2 text-right tabular-nums transition-colors focus:border-ink focus:bg-white focus:outline-none";

function PriceInput({ id, label, note, group, price }: { id: string; label: string; note?: string; group: string; price: Price }) {
  return (
    <li className="flex flex-wrap items-center gap-3 py-3">
      <span className="min-w-40 flex-1 text-[0.95rem]">
        {label}
        {note && <span className="block text-xs text-muted">{note}</span>}
      </span>
      <input name={`${id}:min`} type="number" min={0} step={1} required defaultValue={price.min} aria-label={`${group} · ${label}: price`} className={field} />
      <span className="text-muted" aria-hidden>–</span>
      <input name={`${id}:max`} type="number" min={0} step={1} defaultValue={price.max ?? ""} placeholder="max" aria-label={`${group} · ${label}: maximum price (optional)`} className={field} />
    </li>
  );
}

function BranchForm({ adminKey, branch, tabs, hidden }: { adminKey: string; branch: Branch; tabs: PriceTab[]; hidden: boolean }) {
  const [state, action, pending] = useActionState(savePrices, null);
  return (
    <form action={action} hidden={hidden} id={`edit-${branch.id}`} role="tabpanel" aria-label={`${branch.name} prices`} className="mx-auto mt-10 max-w-3xl">
      <input type="hidden" name="key" value={adminKey} />
      <input type="hidden" name="branch" value={branch.id} />
      {tabs.map((t) => (
        <fieldset key={t.id} className="mb-10">
          <legend className="display text-3xl">{t.label}</legend>
          {t.groups.map((g) => (
            <div key={g.title} className="mt-4 rounded-[1.5rem] border border-line bg-white/70 px-6 py-4">
              <h2 className="font-semibold">{g.title}</h2>
              <ul className="divide-y divide-line">
                {g.rows?.map((r) => (
                  <PriceInput key={r.name} id={priceKey(t.id, g.title, r.name)} label={r.name} note={r.note} group={g.title} price={r.price} />
                ))}
                {g.tiers?.map((x) => (
                  <PriceInput key={x.label} id={priceKey(t.id, g.title, x.label)} label={x.label} group={g.title} price={x.price} />
                ))}
              </ul>
            </div>
          ))}
        </fieldset>
      ))}
      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-cream shadow-[var(--shadow-soft)]">
        <p role="status" className={`text-sm ${state && !state.ok ? "text-gold" : ""}`}>
          {state?.message ?? `Editing ${branch.name}`}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 shrink-0 rounded-full bg-cream px-6 text-sm font-semibold text-ink transition-colors hover:bg-gold disabled:opacity-60"
        >
          {pending ? "Saving…" : `Save ${branch.name}`}
        </button>
      </div>
    </form>
  );
}

/** One form per branch; both stay mounted so switching keeps unsaved edits. */
export function PriceEditor({ adminKey, pricing }: { adminKey: string; pricing: Record<BranchId, PriceTab[]> }) {
  const [active, setActive] = useState<BranchId>(BRANCHES[0].id);
  return (
    <div className="mt-10">
      <TabBar
        tabs={BRANCHES.map((b) => ({ id: b.id, label: b.name }))}
        active={active}
        onChange={setActive}
        layoutId="edit-branch-tab"
        label="Branch"
        controls={`edit-${active}`}
      />
      {BRANCHES.map((b) => (
        <BranchForm key={b.id} adminKey={adminKey} branch={b} tabs={pricing[b.id]} hidden={b.id !== active} />
      ))}
    </div>
  );
}
