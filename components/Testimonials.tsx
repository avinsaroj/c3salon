import { Quote, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./motion";
import { Button } from "./ui";
import { SectionHeading } from "./SectionHeading";

type Review = { name: string; text: string };

/**
 * Add real, verbatim client reviews here (with permission). No reviews are
 * fabricated; while this list is empty an invitation is shown instead.
 */
const REVIEWS: Review[] = [];

function Stars({ filled = true }: { filled?: boolean }) {
  return (
    <div className="flex gap-1 text-bronze" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${filled ? "fill-current" : ""}`} aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-h" className="bg-sand/50 py-20 md:py-28">
      <div className="container-lux">
        <SectionHeading id="reviews-h" eyebrow="Testimonials" lines={["What our", "clients say"]} accent={1} center />

        {REVIEWS.length ? (
          <>
            <ul className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
              {REVIEWS.map((r) => (
                <li key={r.name} className="w-[85%] shrink-0 snap-center rounded-[1.75rem] bg-cream p-8 shadow-sm md:w-[45%] lg:w-[32%]">
                  <Stars />
                  <p className="mt-5 leading-relaxed">“{r.text}”</p>
                  <p className="mt-6 font-semibold">{r.name}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Button href={SITE.reviewUrl} variant="outline">Review us</Button>
            </div>
          </>
        ) : (
          <Reveal className="mx-auto mt-14 max-w-2xl rounded-[2rem] bg-cream px-6 py-14 text-center shadow-[var(--shadow-soft)] sm:px-14">
            <Quote className="mx-auto size-10 text-nude" aria-hidden />
            <p className="display mt-6 text-4xl md:text-5xl">Your experience matters to us.</p>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Visited C3? Share a few words on Google. It helps others in Belgaum find us.
            </p>
            <div className="mt-6 flex justify-center">
              <Stars filled={false} />
            </div>
            <div className="mt-8">
              <Button href={SITE.reviewUrl}>Review us</Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
