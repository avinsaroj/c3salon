"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Animation features are code-split and loaded after first paint.
const features = () => import("./motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
