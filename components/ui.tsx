import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "outline-light";
  className?: string;
};

const VARIANTS = {
  primary: "bg-ink text-cream hover:bg-bronze",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-ink hover:bg-gold",
  "outline-light": "border border-cream/30 text-cream hover:bg-cream hover:text-ink",
} as const;

/** Pill button rendered as a link; internal routes use next/link. */
export function Button({ href, children, variant = "primary", className = "" }: BtnProps) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] ${VARIANTS[variant]} ${className}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  if (href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Text link with a circular arrow that turns on hover. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const cls = `group inline-flex min-h-11 items-center gap-3 text-sm font-semibold ${className}`;
  const inner = (
    <>
      {children}
      <span className="grid size-9 place-items-center rounded-full border border-current/20 transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </>
  );
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow inline-flex items-center gap-2.5 text-bronze ${className}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </p>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.47 15l-1.5 5.5 5.63-1.48A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.2 15.02l-.3-.18-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.9c-.2 0-.5.07-.76.35-.26.28-1 .98-1 2.4s1.03 2.8 1.17 3c.15.2 2 3.2 4.95 4.36 2.45.96 2.95.77 3.48.72.53-.05 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34-.29-.15-1.7-.84-1.96-.94-.27-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.2.05-.36-.02-.5-.07-.15-.65-1.58-.9-2.16-.23-.56-.47-.48-.65-.49h-.55Z" />
    </svg>
  );
}
