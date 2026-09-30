"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { EASE, NAV, SITE, bookHref, waLink } from "@/lib/site";
import { BranchSelect, useBranch } from "./Branch";
import { LogoMark } from "./Logo";
import { Instagram, WhatsAppIcon } from "./ui";

export function Navbar() {
  const pathname = usePathname();
  const { branch } = useBranch();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open ? "border-b border-line bg-cream/85 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
        }`}
      >
        <div className="container-lux flex items-center justify-between gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="C3 Unisex Salon, home">
            <LogoMark className="w-10 text-ink" />
            <span className="hidden text-sm font-bold leading-tight tracking-[0.14em] min-[400px]:block">UNISEX SALON</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-cream/70 p-1 backdrop-blur">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(n.href) ? "text-cream" : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    {isActive(n.href) && (
                      <m.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ duration: 0.45, ease: EASE }} />
                    )}
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BranchSelect />
            {/* Between lg and xl the desktop nav leaves no room for this button. */}
            <Link
              href={bookHref()}
              className="hidden min-h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-cream transition-colors hover:bg-bronze sm:inline-flex lg:hidden xl:inline-flex"
            >
              Book Appointment
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream px-5 pb-28 pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex-1">
              {NAV.map((n, i) => (
                <m.li
                  key={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: EASE }}
                  className="border-b border-line"
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4"
                  >
                    <span className={`display text-4xl ${isActive(n.href) ? "italic text-bronze" : ""}`}>{n.label}</span>
                    <span className="text-xs text-muted">0{i + 1}</span>
                  </Link>
                </m.li>
              ))}
            </ul>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-10 space-y-4"
            >
              <Link href={bookHref()} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-center rounded-full bg-ink font-semibold text-cream">
                Book Appointment
              </Link>
              <div className="flex justify-center gap-3">
                <a href={`tel:${branch.phone}`} aria-label={`Call C3 Unisex Salon ${branch.name}`} className="grid size-12 place-items-center rounded-full border border-line">
                  <Phone className="size-5" aria-hidden />
                </a>
                <a href={waLink(branch)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp C3 Unisex Salon ${branch.name}`} className="grid size-12 place-items-center rounded-full border border-line">
                  <WhatsAppIcon className="size-5" />
                </a>
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="C3 Unisex Salon on Instagram" className="grid size-12 place-items-center rounded-full border border-line">
                  <Instagram className="size-5" />
                </a>
              </div>
            </m.div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
