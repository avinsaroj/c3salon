import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { BRANCHES, type BranchId } from "./branches";
import { applyOverrides, type PriceOverrides, type PriceTab } from "./pricing";

/**
 * Prices saved from the price admin route. Only lines that differ from
 * lib/pricing.ts are stored, so rate card edits in code still show through.
 * Delete the file to go back to the printed rate cards.
 */
const FILE = path.join(process.cwd(), "data", "price-overrides.json");

type Store = Partial<Record<BranchId, PriceOverrides>>;

async function read(): Promise<Store> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw e;
  }
}

/** Each branch's live price list: its rate card with saved edits applied. */
export async function getPricing(): Promise<Record<BranchId, PriceTab[]>> {
  const store = await read();
  return Object.fromEntries(BRANCHES.map((b) => [b.id, applyOverrides(b.pricing, store[b.id] ?? {})])) as Record<
    BranchId,
    PriceTab[]
  >;
}

export async function saveOverrides(id: BranchId, overrides: PriceOverrides) {
  const store = await read();
  store[id] = overrides;
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(store, null, 2));
}

/** The admin route is /price-admin/<PRICE_ADMIN_KEY>; with no key set it is disabled. */
export function isAdminKey(key: string) {
  const secret = process.env.PRICE_ADMIN_KEY;
  return !!secret && key === secret;
}
