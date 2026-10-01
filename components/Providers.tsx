"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { BranchId } from "@/lib/branches";
import type { PriceTab } from "@/lib/pricing";
import { BranchProvider } from "./Branch";

// Animation features are code-split and loaded after first paint.
const features = () => import("./motion-features").then((mod) => mod.default);

export function Providers({
  branch,
  pricing,
  children,
}: {
  branch: BranchId;
  pricing: Record<BranchId, PriceTab[]>;
  children: React.ReactNode;
}) {
  return (
    <BranchProvider initial={branch} pricing={pricing}>
      <LazyMotion features={features} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </BranchProvider>
  );
}
