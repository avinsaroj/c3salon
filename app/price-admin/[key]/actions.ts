"use server";

import { revalidatePath } from "next/cache";
import { BRANCHES } from "@/lib/branches";
import { isAdminKey, saveOverrides } from "@/lib/price-store";
import { priceLines, type PriceOverrides } from "@/lib/pricing";

export type SaveState = { ok: boolean; message: string } | null;

export async function savePrices(_: SaveState, form: FormData): Promise<SaveState> {
  if (!isAdminKey(String(form.get("key")))) return { ok: false, message: "Not allowed." };
  const branch = BRANCHES.find((b) => b.id === form.get("branch"));
  if (!branch) return { ok: false, message: "Unknown branch." };

  // Keep only lines whose price differs from the printed rate card.
  const overrides: PriceOverrides = {};
  for (const { key, label, price } of priceLines(branch.pricing)) {
    const minRaw = form.get(`${key}:min`);
    if (minRaw === null) continue;
    const min = Number(minRaw);
    const maxRaw = String(form.get(`${key}:max`) ?? "").trim();
    const max = maxRaw ? Number(maxRaw) : undefined;
    if (!Number.isInteger(min) || min < 0) return { ok: false, message: `${label}: enter a whole number.` };
    if (max !== undefined && (!Number.isInteger(max) || max <= min)) {
      return { ok: false, message: `${label}: the maximum must be more than ₹${min}.` };
    }
    if (min !== price.min || max !== price.max) overrides[key] = { min, max };
  }

  await saveOverrides(branch.id, overrides);
  revalidatePath("/", "layout");
  return { ok: true, message: `${branch.name} prices saved.` };
}
