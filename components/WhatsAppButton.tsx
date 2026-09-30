"use client";

import Link from "next/link";
import { WhatsAppIcon } from "./ui";
import { bookHref, waLink } from "@/lib/site";
import { useBranch } from "./Branch";

/** Floating button on desktop; sticky two-action bar on mobile. */
export function WhatsAppButton() {
  const { branch } = useBranch();
  return (
    <>
      <a
        href={waLink(branch)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with C3 Unisex Salon ${branch.name} on WhatsApp`}
        className="group fixed bottom-7 right-7 z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-110 md:grid"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] [animation:ping-soft_2.8s_ease-out_infinite]" aria-hidden />
        <WhatsAppIcon className="relative size-7" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream opacity-0 transition-all duration-300 group-hover:opacity-100">
          Chat with us
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Link href={bookHref()} className="flex min-h-12 items-center justify-center rounded-full bg-ink text-sm font-semibold text-cream">
            Book Appointment
          </Link>
          <a
            href={waLink(branch)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-white text-sm font-semibold text-ink"
          >
            <WhatsAppIcon className="size-5 text-[#1DA851]" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
