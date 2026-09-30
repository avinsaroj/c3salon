import { cookies } from "next/headers";
import { BRANCH_COOKIE, branchById } from "./branches";

/** The visitor's chosen branch, for server components. Defaults to Belgaum. */
export async function getBranch() {
  return branchById((await cookies()).get(BRANCH_COOKIE)?.value);
}
