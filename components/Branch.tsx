"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin } from "lucide-react";
import { BRANCHES, BRANCH_COOKIE, DEFAULT_BRANCH, branchById, type Branch, type BranchId } from "@/lib/branches";

const BranchContext = createContext<{ branch: Branch; select: (id: BranchId) => void }>({
  branch: DEFAULT_BRANCH,
  select: () => {},
});

/**
 * The chosen branch lives in a cookie so server components render the right
 * phone, address and prices on the first paint. Switching refreshes them.
 */
export function BranchProvider({ initial, children }: { initial: BranchId; children: React.ReactNode }) {
  const router = useRouter();
  const [id, setId] = useState(initial);
  useEffect(() => setId(initial), [initial]);

  const select = (next: BranchId) => {
    document.cookie = `${BRANCH_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setId(next);
    router.refresh();
  };

  return <BranchContext.Provider value={{ branch: branchById(id), select }}>{children}</BranchContext.Provider>;
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
