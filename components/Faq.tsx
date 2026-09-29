import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/lib/services";
import { Reveal } from "./motion";
import { SectionHeading } from "./SectionHeading";

export function Faq({ items, lines = ["Good to", "know"] }: { items: FaqItem[]; lines?: string[] }) {
  return (
    <section aria-labelledby="faq-h" className="container-lux grid gap-12 py-20 md:py-28 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionHeading id="faq-h" eyebrow="FAQ" lines={lines} accent={1} />
      </div>
      <Reveal delay={0.1} className="space-y-3 lg:col-span-8">
        {items.map((f) => (
          <details key={f.q} className="group rounded-3xl border border-line bg-white/60 px-6 transition-colors open:bg-white md:px-8">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold md:text-lg [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand transition-all duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-cream" aria-hidden>
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
