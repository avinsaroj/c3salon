"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { BranchId } from "@/lib/branches";
import { BranchProvider } from "./Branch";

// Animation features are code-split and loaded after first paint.
const features = () => import("./motion-features").then((mod) => mod.default);

export function Providers({ branch, children }: { branch: BranchId; children: React.ReactNode }) {
  return (
    <BranchProvider initial={branch}>
      <LazyMotion features={features} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </BranchProvider>
  );
}
