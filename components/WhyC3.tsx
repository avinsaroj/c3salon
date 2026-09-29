import { Reveal } from "./motion";
import { SectionHeading } from "./SectionHeading";

const REASONS = [
  { n: "01", t: "Expert Styling", d: "Trained stylists who listen first and shape hair that suits you." },
  { n: "02", t: "Personalized Experience", d: "A consultation for every visit, so the result is truly yours." },
  { n: "03", t: "Premium Services", d: "From colour and treatments to bridal makeup and skin care." },
  { n: "04", t: "Modern Salon Experience", d: "A comfortable, calm space designed for you to unwind." },
];

export function WhyC3() {
  return (
    <section aria-labelledby="why-h" className="container-lux py-20 md:py-28">
      <SectionHeading
        id="why-h"
        eyebrow="Why choose us"
        lines={["Why C3?"]}
        center
        lead="Four promises behind every appointment, whether it’s a quick trim or your wedding day."
      />
      <ol className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {REASONS.map((r, i) => (
          <Reveal
            as="li"
            key={r.n}
            delay={i * 0.08}
            className="group rounded-[1.5rem] border border-line bg-white/60 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[var(--shadow-soft)] sm:rounded-[1.75rem] sm:p-8"
          >
            <span className="display text-5xl italic text-bronze sm:text-6xl">{r.n}</span>
            <h3 className="mt-5 font-bold sm:mt-8 sm:text-lg">{r.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{r.d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
