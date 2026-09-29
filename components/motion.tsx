"use client";

import Image from "next/image";
import { m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useId, useRef } from "react";
import { EASE } from "@/lib/site";
import type { Photo } from "@/lib/images";

/**
 * Viewport margin for reveals. The huge top margin counts anything already
 * scrolled past as "in view", so a fast flick that skips over an element
 * between observer checks still reveals it instead of leaving it hidden.
 */
export const VIEW_MARGIN = "10000px 0px -8% 0px";

/** Fade-up once when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: VIEW_MARGIN }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/**
 * Masked line-by-line rise. `onMount` animates immediately (page heroes);
 * otherwise it waits until the block is in view.
 */
export function SplitReveal({
  lines,
  className,
  onMount = false,
  delay = 0,
  accent,
  accentClass = "italic text-bronze",
}: {
  lines: string[];
  className?: string;
  onMount?: boolean;
  delay?: number;
  /** Index of a line to set in the accent style. */
  accent?: number;
  accentClass?: string;
}) {
  const reduce = useReducedMotion();
  // Observe the wrapper: each line is clipped by its own mask, so observing the
  // lines themselves would never report them as visible.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEW_MARGIN });
  const show = onMount || inView || reduce;
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <m.span
            className={`block ${i === accent ? accentClass : ""}`}
            initial={reduce ? false : { y: "110%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/** Rounded image that unveils with a soft scale, plus optional gentle parallax. */
export function ImageReveal({
  image,
  className = "",
  sizes = "100vw",
  parallax = 0,
  priority = false,
  imgClassName = "",
}: {
  image: Photo;
  className?: string;
  sizes?: string;
  /** Drift strength in percent; 0 disables parallax. */
  parallax?: number;
  priority?: boolean;
  imgClassName?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEW_MARGIN });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const skip = reduce || priority;
  const show = inView || skip;

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden bg-sand ${className}`}
      initial={skip ? false : { opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE }}
    >
      <m.div
        className="absolute inset-x-0"
        style={{ top: `-${parallax}%`, bottom: `-${parallax}%`, y: parallax && !reduce ? y : 0 }}
        initial={skip ? false : { scale: 1.12 }}
        animate={show ? { scale: 1 } : undefined}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={`object-cover ${imgClassName}`}
        />
      </m.div>
    </m.div>
  );
}

/** Pulls the child gently toward the cursor. Mouse only; off for reduced motion. */
export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  if (reduce) return <div className={`inline-block ${className}`}>{children}</div>;
  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-out ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

/** Infinite horizontal ticker. Pauses on hover; static for reduced motion. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="flex items-center">
          <span className="px-6 md:px-10">{t}</span>
          <span className="text-[0.45em] text-bronze" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div className="flex [animation:marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Slowly rotating circular text badge. Decorative. */
export function RotatingBadge({ text, className = "" }: { text: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <g className="origin-center [animation:spin-slow_26s_linear_infinite] [transform-box:fill-box]">
        <text fontSize="9.6" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="600">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </g>
    </svg>
  );
}
