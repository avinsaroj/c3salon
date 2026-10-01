import { cookies } from "next/headers";
import { BRANCH_COOKIE, branchById } from "./branches";
import { getPricing } from "./price-store";

/** The visitor's chosen branch, for server components, with its live price list. Defaults to Belgaum. */
export async function getBranch() {
  const branch = branchById((await cookies()).get(BRANCH_COOKIE)?.value);
  return { ...branch, pricing: (await getPricing())[branch.id] };
}
