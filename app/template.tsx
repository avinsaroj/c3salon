"use client";

import { m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/site";
import { LogoMark } from "@/components/Logo";

// The curtain only plays on client-side navigation, never on the first load,
// so it can't delay the initial paint.
let hasHydrated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [curtain] = useState(() => {
    if (typeof window === "undefined") return false;
    const play = hasHydrated;
    hasHydrated = true;
    return play;
  });

  return (
    <>
      {curtain && !reduce && (
        <m.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-sand"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
        >
          <m.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.25, delay: 0.15 }}>
            <LogoMark className="w-20 text-ink" />
          </m.div>
        </m.div>
      )}
      {children}
    </>
  );
}
